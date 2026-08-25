import Paystack from "@paystack/inline-js";
import { createOrder } from "../../services/orderServices";
import dayjs from "dayjs";
import { isValidPhoneNumber } from "libphonenumber-js";
import { isValidEmail } from "../../lib/validation/validation";
import { toast } from "sonner";
import { defaultStyles } from "../../styles/components/reactSelect";

export const isValidName = (name) => {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (trimmed.length < 2) return false;

  const regex = /^[\p{L}\p{M}]+(?:[-' ][\p{L}\p{M}]+)*$/u;

  return regex.test(trimmed);
};

export const isValidAddress = (address) => {
  const trimmed = address.trim().replace(/\s+/g, " ");

  if (!trimmed) {
    return "Enter a valid email address";
  }

  if (trimmed.length < 5) {
    return "Address is too short";
  }

  if (trimmed.length > 100) {
    return "Address must be no more than 100 characters long";
  }

  if (!/^[\p{L}\p{M}\d\s,.'#/()-]+$/u.test(trimmed)) {
    return "Address contains invalid characters";
  }

  if (!/\d/.test(trimmed)) {
    return "Please include your house or building number";
  }
  return null;
};

export const isValidDeliveryNotes = (notes) => {
  const trimmed = notes.trim();

  if (!trimmed) return true;
  return trimmed.length <= 500;
};

export const truncate = (text, maxLength = 120) => {
  if (!text) return "";

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export function isFormValid(shippingDetails, selectedShipping) {
  const validFirstName = {
    isValid: isValidName(shippingDetails?.firstName),
    message: isValidName(shippingDetails?.firstName)
      ? null
      : "Invalid first name",
  };
  const validLastName = {
    isValid: isValidName(shippingDetails?.lastName),
    message: isValidName(shippingDetails?.lastName)
      ? null
      : "Invalid last name",
  };

  const validEmail = {
    isValid: isValidEmail(shippingDetails?.email),
    message: isValidEmail(shippingDetails?.email) ? null : "Invalid First name",
  };

  const validTel = isValidPhoneNumber(shippingDetails?.tel, "NG");
  const validAddress = !isValidAddress(shippingDetails?.address);

  const validity =
    validFirstName &&
    validLastName &&
    validEmail &&
    validTel &&
    validAddress &&
    shippingDetails?.state.trim() !== "" &&
    shippingDetails?.city.trim() !== "" &&
    selectedShipping?.id;

  return validity;
}

export const initiatePayment = ({
  setLoading,
  userId,
  cartTotalPrice,
  cartInDetail,
  shippingDetails,
  selectedShipping,
  setCart,
  navigate,
}) => {
  setLoading(true);
  const popup = new Paystack();
  const totalCost = cartTotalPrice + selectedShipping?.costInCents;

  popup.checkout({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: shippingDetails?.email,
    amount: totalCost,
    onSuccess: async (transaction) => {
      try {
        if (!transaction?.reference) {
          throw new Error("Invalid transaction reference");
        }

        const orderData = {
          reference: transaction.reference,
          user_id: userId,
          subtotal: cartTotalPrice,
          total: totalCost,
          items: cartInDetail,
          shipping_details: shippingDetails,
          email: shippingDetails?.email,
          courier_details: selectedShipping,
          status: "processing",
          processing_at: new Date().toISOString(),
        };

        const result = await createOrder(orderData);
        if (!result.success) {
          toast.error(
            "Your payment was successful, but we couldn't save your order.",
            {
              description: `Payment reference: ${transaction.reference}. Please keep this reference and contact support.`,
              duration: 15000,
            },
          );
          return;
        }
        setCart([]);
        sessionStorage.setItem("recentOrder", JSON.stringify(orderData));
        navigate(`/order/${orderData.reference}`);
      } catch {
        toast.error("Something went wrong. Please try again in a few minutes.");
      } finally {
        setLoading(false);
      }
    },
    onLoad: () => {},
    onCancel: () => {
      toast.info("Payment was cancelled.");
      setLoading(false);
    },
    onError: () => {
      toast.error("We couldn’t start your payment. Please try again.");
      setLoading(false);
    },
  });
};

export function dropDownStyles(variant, error = false, isDisabled) {
  return variant === "shippingOpts"
    ? {
        control: (base, state) => ({
          ...base,
          cursor: "pointer",
          fontFamily: "var(--font-secondary)",
          borderColor: isDisabled
            ? "lightgray"
            : error
              ? "var(--color-brand)"
              : state.isFocused
                ? "var(--color-brand)"
                : "var(--border-default)",
          boxShadow: "none",
          "&:hover": {
            borderColor: state.isFocused
              ? "var(--color-brand)"
              : "var(--border-default)",
          },
        }),
        ...defaultStyles,
      }
    : {
        control: (base) => ({
          ...base,
          boxShadow: "none",
          width: "100%",
          marginInline: "0",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: "none",
        }),

        indicatorSeparator: (base) => ({
          ...base,
          display: "none",
        }),

        container: (base) => ({ ...base, width: "80%" }),
      };
}

export function getShippingOptions(state) {
  const isAbuja = state === "FCT (Abuja)";

  return [
    {
      id: "DHL",
      desc: "2–5 working days",
      minDeliveryDay: calculateDeliveryDays(2),
      maxDeliveryDay: calculateDeliveryDays(5),
      costInCents: isAbuja ? 1000000 : 1500000,
    },
    {
      id: "KOS",
      desc: "4–7 working days",
      minDeliveryDay: calculateDeliveryDays(4),
      maxDeliveryDay: calculateDeliveryDays(7),
      costInCents: isAbuja ? 550000 : 650000,
    },
    {
      id: "Shipbubble",
      desc: "7–10 working days",
      minDeliveryDay: calculateDeliveryDays(7),
      maxDeliveryDay: calculateDeliveryDays(10),
      costInCents: isAbuja ? 350000 : 450000,
    },
  ];
}
//check if tomorrow falls in weekend
//if yes, skip
//if no, substract from countdown
//loop again
export const calculateDeliveryDays = (length) => {
  const orderedDate = dayjs();
  let today = dayjs();
  let countdown = length;
  const weekend = [0, 6];

  while (countdown) {
    today = today.add(1, "d");
    const todayWeekNumber = today.day();
    const isWeekend = weekend.includes(todayWeekNumber);
    if (!isWeekend) {
      countdown--;
    }
  }
  if (orderedDate.year() !== today.year()) {
    return today.format("ddd, DD MMM YYYY");
  }

  return today.format("ddd, DD MMM");
};

export function getOrderDate(inputDate, time = false) {
  const returnDate = dayjs(inputDate).format("MMM D, YYYY");
  const returnTime = dayjs(inputDate).format("h:mm A");

  if (time) {
    return `${returnDate} at ${returnTime}`;
  }
  return returnDate;
}

export const handlePrint = () => {
  window.print();
};
