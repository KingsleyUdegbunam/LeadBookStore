import { Link } from "react-router-dom";
import { ShippingDetailsForm } from "./ShippingDetailsForm";
export function ShippingDetails({
  phoneError,
  emailError,
  firstNameError,
  lastNameError,
  addressError,
  notesError,
  setPhoneError,
  setEmailError,
  setFirstNameError,
  setLastNameError,
  setAddressError,
  setNotesError,
  shippingDetails,
  setShippingDetails,
}) {
  return (
    <section className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">Step 2: Shipping Details</p>
        <p className="details-subheader">Tell us where to deliver your order</p>
      </div>
      <div className="auth-cta-checkout">
        <p className="account-action">
          Already have an account?{" "}
          <Link className="checkout-links">Log in</Link> for a faster checkout.
        </p>
        <ShippingDetailsForm
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
        />
      </div>
    </section>
  );
}
