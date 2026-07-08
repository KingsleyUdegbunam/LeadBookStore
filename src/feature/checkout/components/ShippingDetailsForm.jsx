import { isValidPhoneNumber } from "libphonenumber-js";
import {
  isValidAddress,
  isValidDeliveryNotes,
  isValidEmail,
  isValidName,
} from "../utilities";

export function ShippingDetailsForm({
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
    <article className="primary-form-container shipping-details-form">
      {shippingDetails?.state && (
        <div className="details-subheader text-right-aligned">
          <p>
            📍 {shippingDetails?.state}
            {shippingDetails?.city && ", " + shippingDetails?.city}
          </p>
        </div>
      )}

      <div className="email-container user-info-div">
        <label htmlFor="email">
          Email<span className="important">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={shippingDetails?.email}
          onChange={(e) => {
            const value = e.target.value;
            setShippingDetails((prev) => ({
              ...prev,
              email: e.target.value,
            }));
            if (emailError) {
              setEmailError(!isValidEmail(value));
            }
          }}
          onBlur={() => {
            const validEmail = isValidEmail(shippingDetails?.email);
            setEmailError(!validEmail);
          }}
          required
          placeholder="Email address"
        />
        {emailError && (
          <span className="tel-error">
            {shippingDetails?.email} is not a valid email address
          </span>
        )}
      </div>

      <div className="user-info-div">
        <label htmlFor="first-name">
          First Name<span className="important">*</span>
        </label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          value={shippingDetails?.firstName}
          required
          onChange={(e) => {
            const value = e.target.value;
            setShippingDetails((prev) => ({
              ...prev,
              firstName: e.target.value,
            }));

            if (firstNameError) {
              setFirstNameError(!isValidName(value));
            }
          }}
          onBlur={() => {
            const valid = isValidName(shippingDetails?.firstName);
            setFirstNameError(!valid);
          }}
        />
        {firstNameError && (
          <span className="tel-error">Enter a valid name</span>
        )}
      </div>

      <div className="user-info-div">
        <label htmlFor="last-name">
          Last Name<span className="important">*</span>
        </label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          value={shippingDetails?.lastName}
          required
          onChange={(e) => {
            const value = e.target.value;
            setShippingDetails((prev) => ({
              ...prev,
              lastName: e.target.value,
            }));

            if (lastNameError) {
              setLastNameError(!isValidName(value));
            }
          }}
          onBlur={() => {
            setLastNameError(!isValidName(shippingDetails?.lastName));
          }}
        />
        {lastNameError && <span className="tel-error">Enter a valid name</span>}
      </div>

      <div className="tel-container">
        <div className="user-info-div">
          <label htmlFor="telephone">
            Phone<span className="important">*</span>
          </label>
          <div className="tel-input-field-and-error-display">
            <input
              value={shippingDetails?.tel}
              onChange={(e) => {
                const value = e.target.value;
                setShippingDetails((prev) => ({ ...prev, tel: value }));
                if (phoneError) {
                  const valid = isValidPhoneNumber(value, "NG");
                  setPhoneError(!valid);
                }
              }}
              onBlur={() => {
                const valid = isValidPhoneNumber(shippingDetails?.tel, "NG");
                setPhoneError(!valid);
              }}
              // onAnimationStart={(e) => {
              //   if (e.animationName === "onAutoFillStart") {
              //     const valid = isValidPhoneNumber(e.target.value, "NG");
              //     setPhoneError(!valid);
              //     setPhone(e.target.value);
              //     if (valid) {
              //       setShippingDetails((prev) => ({
              //         ...prev,
              //         tel: e.target.value,
              //       }));
              //     }
              //   }
              // }}
              type="tel"
              name="telephone"
              id="telephone"
              required
            />
            {phoneError && (
              <span className="tel-error">Invalid phone number</span>
            )}
          </div>
        </div>
      </div>

      <div className="address user-info-div">
        <label htmlFor="address">
          Address<span className="important">*</span>
          <p className="details-subheader">
            Include your house number and street name
          </p>
        </label>

        <input
          placeholder="12 Admiralty Way"
          required
          type="text"
          name="address"
          id="address"
          value={shippingDetails?.address}
          onChange={(e) => {
            const value = e.target.value;
            setShippingDetails((prev) => ({
              ...prev,
              address: e.target.value,
            }));
            if (addressError) {
              const response = isValidAddress(value);
              setAddressError(response);
            }
          }}
          onBlur={() => {
            const response = isValidAddress(shippingDetails?.address);
            setAddressError(response);
          }}
        />
        {addressError && <span className="tel-error">{addressError}</span>}
      </div>

      <div className="address user-info-div">
        <label htmlFor="deliveryNotes">
          Delivery Intructions
          <span className="details-subheader"> (Optional)</span>
        </label>

        <textarea
          placeholder="e.g. Blue gate, opposite GTBank. Call when you arrive."
          rows={3}
          maxLength={500}
          type="text"
          name="deliveryNotes"
          id="deliveryNotes"
          value={shippingDetails?.deliveryNotes}
          onChange={(e) => {
            const value = e.target.value;
            setShippingDetails((prev) => ({
              ...prev,
              deliveryNotes: e.target.value,
            }));

            if (notesError) {
              isValidDeliveryNotes(value) && setNotesError(!notesError);
            }
          }}
          onBlur={() => {
            !isValidDeliveryNotes(shippingDetails?.deliveryNotes) &&
              setNotesError(true);
          }}
        />
        {notesError && (
          <span className="tel-error">
            "Delivery notes cannot exceed 500 characters."
          </span>
        )}
      </div>
    </article>
  );
}
