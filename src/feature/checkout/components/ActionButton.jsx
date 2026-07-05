import { useNavigate } from "react-router-dom";
import { isFormValid } from "../utilities";

export function ActionButton({
  isReadyToPay,
  cartTotalPrice,
  cartInDetail,
  shippingDetails,
  selectedShipping,
  setCart,
  setShowSummary,
  initiatePayment,
  setShowShipDetailsForm,
  setShowShippingOptForm,
}) {
  const formValid = isFormValid(shippingDetails, selectedShipping);
  const navigate = useNavigate();

  const hideForms = () => {
    setShowShipDetailsForm(false);
    setShowShippingOptForm(false);
  };
  return (
    <button
      disabled={!isFormValid}
      className={`checkout-page-btn-disabled checkout-continue-btn ${formValid && "btn-enabled"}`}
      onClick={() => {
        if (formValid) {
          if (isReadyToPay) {
            initiatePayment(
              cartTotalPrice,
              cartInDetail,
              shippingDetails,
              selectedShipping,
              setCart,
              navigate,
            );
            return;
          }
          hideForms();
          setShowSummary(true);
        }
      }}
    >
      {isReadyToPay ? "PLACE ORDER" : "CONTINUE"}
    </button>
  );
}
