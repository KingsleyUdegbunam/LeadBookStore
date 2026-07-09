import { useState } from "react";
import { ShippingOptions } from "./ShippingOptions";
import { ShippingDetails } from "./ShippingDetails";
import { ActionButton } from "./ActionButton";
import { isValidAddress, isValidEmail, isValidName } from "../utilities";
import { isValidNumber } from "libphonenumber-js";
import { useNavigate } from "react-router-dom";
import { initiatePayment } from "../utilities";

export function ShippingInfo({
  showShippingOptForm,
  showShippingDetailsForm,
  setShowShippingDetailsForm,
  setShowShippingOptForm,
  showSummary,
  setShowSummary,

  shippingDetailsFormRef,
  deliveryOptionsFormRef,

  selectedShipping,
  setSelectedShipping,

  shippingDetails,
  setShippingDetails,
  cartTotalPrice,
  cartInDetail,
  setCart,
}) {
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [notesError, setNotesError] = useState(false);

  const navigate = useNavigate();

  const hideForms = () => {
    setShowShippingDetailsForm(false);
    setShowShippingOptForm(false);
  };
  const isReadyToPay = !showShippingDetailsForm && !showShippingOptForm;

  const validStateCity = (field) => {
    if (field === "state") {
      const isValid = shippingDetails.state ? true : false;
      !isValid && setStateError(true);

      return isValid;
    }
    if (field === "city") {
      const isValid = shippingDetails.city ? true : false;
      !isValid && setCityError(true);

      return isValid;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = isValidEmail(shippingDetails?.email);
    !validEmail && setEmailError(true);

    const validFirstName = isValidName(shippingDetails?.firstName);
    !validFirstName && setFirstNameError(true);

    const validLastName = isValidName(shippingDetails?.lastName);
    !validLastName && setLastNameError(true);

    const validTel = isValidNumber(shippingDetails?.tel, "NG");
    !validTel && setPhoneError(true);

    const invalidAddress = isValidAddress(shippingDetails?.address);
    invalidAddress && setAddressError(invalidAddress);

    const validState = validStateCity("state");
    const validCity = validStateCity("city");

    const validForm =
      validState &&
      validCity &&
      validEmail &&
      validFirstName &&
      validLastName &&
      validTel &&
      !invalidAddress &&
      selectedShipping?.id;

    if (validForm) {
      console.log("YES");
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
  };

  return (
    <form onSubmit={handleSubmit}>
      {showShippingOptForm && (
        <ShippingOptions
          deliveryOptionsFormRef={deliveryOptionsFormRef}
          stateError={stateError}
          cityError={cityError}
          setStateError={setStateError}
          setCityError={setCityError}
          showSummary={showSummary}
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
        />
      )}

      {showShippingDetailsForm && (
        <ShippingDetails
          shippingDetailsFormRef={shippingDetailsFormRef}
          phoneError={phoneError}
          emailError={emailError}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          addressError={addressError}
          notesError={notesError}
          setPhoneError={setPhoneError}
          setEmailError={setEmailError}
          setFirstNameError={setFirstNameError}
          setLastNameError={setLastNameError}
          setAddressError={setAddressError}
          setNotesError={setNotesError}
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
          showSummary={showSummary}
        />
      )}

      <ActionButton isReadyToPay={isReadyToPay} />
    </form>
  );
}
