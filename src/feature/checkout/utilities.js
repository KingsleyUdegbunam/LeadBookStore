import Paystack from "@paystack/inline-js";
import { createOrder } from "../../services/orderServices";
import dayjs from "dayjs";
import { isValidPhoneNumber } from "libphonenumber-js";

export const isValidEmail = (email) => {
  const trimmed = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(trimmed);
};

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
  if (!/^[\p{L}\p{M}\d\s,.'#/()-]{5,100}$/u.test(trimmed)) {
    return "Address contains invalid characters";
  }

  if (trimmed.length < 5) {
    return "Address is too short";
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

export const initiatePayment = (
  cartTotalPrice,
  cartInDetail,
  shippingDetails,
  selectedShipping,
  setCart,
  navigate,
) => {
  const popup = new Paystack();
  const totalCost = cartTotalPrice + selectedShipping?.costInCents;

  popup.checkout({
    key: "pk_test_87b24dad8322dd4a245702d85bd6035e9af5650b",
    email: shippingDetails?.email,
    amount: totalCost,
    onSuccess: async (transaction) => {
      console.log(transaction);
      try {
        if (!transaction?.reference) {
          throw new Error("Invalid transaction reference");
        }

        const orderData = {
          reference: transaction.reference,
          subtotal: cartTotalPrice,
          total: totalCost,
          items: cartInDetail,
          shipping_details: shippingDetails,
          email: shippingDetails?.email,
          courier_details: selectedShipping,
          status: "paid",
          created_at: new Date(),
        };

        const savedOrder = await createOrder(orderData);
        console.log("THISSSS", savedOrder);

        setCart([]);

        navigate(`/order/${savedOrder.id}`);
      } catch (error) {
        console.error("Order processing failed:", error);
        alert("Something went wrong while processing your order.");
      }
    },
    onLoad: (response) => {
      console.log("onLoad: ", response);
    },
    onCancel: () => {
      console.info("Payment cancelled by user");
    },
    onError: (error) => {
      console.log("Error: ", error.message);
      alert(error.message);
    },
  });
};

export function dropDownStyles(variant, error = false, isDisabled) {
  return variant === "shippingOpts"
    ? {
        control: (base, state) => ({
          ...base,
          cursor: "pointer",
          fontFamily: "Anonymous Pro, monospace",
          borderColor: isDisabled
            ? "lightgray"
            : error
              ? "red"
              : state.isFocused
                ? "black"
                : "#d1d5db",
          boxShadow: "none",
          "&:hover": {
            borderColor: "var(--brand-red-clr)",
          },
        }),

        placeholder: (base) => ({ ...base, color: "lightgray" }),

        valueContainer: (base) => ({
          ...base,
          lineHeight: 1.2,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: ".43rem",
          display: isDisabled ? "none" : undefined,
        }),
        clearIndicator: (base) => ({ ...base, padding: ".43rem" }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        option: (base, state) => ({
          ...base,
          fontFamily: "Anonymous Pro, monospace",
          cursor: "pointer",
          backgroundColor: state.isSelected
            ? "var(--brand-red-clr)"
            : state.isFocused
              ? "var(--brand-red-clr-hover)"
              : "white",
          color: state.isSelected
            ? "white"
            : state.isFocused
              ? "white"
              : "black",
        }),
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
  const today = dayjs();

  return [
    {
      id: "DHL",
      desc: "2-5 Working Days",
      minDeliveryDay: today.add(2, "day").format("MMM DD, YYYY"),
      maxDeliveryDay: today.add(5, "day").format("MMM DD, YYYY"),
      costInCents: isAbuja ? 1000000 : 1500000,
    },
    {
      id: "KOS",
      desc: "4-7 Working Days",
      minDeliveryDay: today.add(4, "day").format("MMM DD, YYYY"),
      maxDeliveryDay: today.add(7, "day").format("MMM DD, YYYY"),
      costInCents: isAbuja ? 550000 : 650000,
    },
    {
      id: "Shipbubble",
      desc: "7-10 Working Days",
      minDeliveryDay: today.add(7, "day").format("MMM DD, YYYY"),
      maxDeliveryDay: today.add(10, "day").format("MMM DD, YYYY"),
      costInCents: isAbuja ? 350000 : 450000,
    },
  ];
}
