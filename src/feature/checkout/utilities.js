import Paystack from "@paystack/inline-js";
import { createOrder } from "../../services/orderServices";
import dayjs from "dayjs";

export function isFormValid(address, shippingDetails) {
  const validity =
    address.state.trim() !== "" &&
    address.city.trim() !== "" &&
    shippingDetails.email.trim() !== "" &&
    shippingDetails.firstName.trim() !== "" &&
    shippingDetails.lastName.trim() !== "" &&
    shippingDetails.address.trim() !== "" &&
    shippingDetails.tel.trim() !== "";

  return validity;
}

export const initiatePayment = (
  cartTotalPrice,
  cartInDetail,
  shippingDetails,
  selectedShipping,
  address,
  setCart,
  navigate,
) => {
  const popup = new Paystack();

  popup.checkout({
    key: "pk_test_87b24dad8322dd4a245702d85bd6035e9af5650b",
    email: shippingDetails.email,
    amount: cartTotalPrice + selectedShipping.costInCents,
    onSuccess: async (transaction) => {
      console.log(transaction);
      try {
        if (!transaction?.reference) {
          throw new Error("Invalid transaction reference");
        }

        const orderData = {
          reference: transaction.reference,
          subtotal: cartTotalPrice,
          total: cartTotalPrice + selectedShipping.costInCents,
          items: cartInDetail,
          shipping_details: { ...address, ...shippingDetails },
          email: shippingDetails.email,
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
      alert("Payment failed. Please try again.");
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
