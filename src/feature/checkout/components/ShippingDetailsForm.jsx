import { useState } from "react";
import Select from "react-select";
import { dropDownStyles } from "../utilities";
import { isValidPhoneNumber } from "libphonenumber-js";

export function ShippingDetailsForm({
  address,
  shippingDetails,
  setShippingDetails,
}) {
  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState(false);

  return (
    <article className="primary-form-container shipping-details-form">
      <div className="email-container user-info-div">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={shippingDetails?.email}
          onChange={(e) => {
            setShippingDetails((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          required
          placeholder="Email address"
        />
      </div>

      <div className="user-info-div">
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          value={shippingDetails?.firstName}
          required
          onChange={(e) =>
            setShippingDetails((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />
      </div>

      <div className="user-info-div">
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          value={shippingDetails?.lastName}
          required
          onChange={(e) =>
            setShippingDetails((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />
      </div>

      <div className="address user-info-div">
        <label htmlFor="address">Address:</label>
        <input
          required
          type="text"
          name="address"
          id="address"
          value={shippingDetails?.address}
          onChange={(e) => {
            setShippingDetails((prev) => ({
              ...prev,
              address: e.target.value,
            }));
          }}
        />
      </div>

      <div className="tel-container">
        <div className="user-info-div">
          <label htmlFor="telephone">Phone:</label>
          <div className="tel-input-field-and-error-display">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) {
                  const valid = isValidPhoneNumber(e.target.value, "NG");
                  setPhoneError(!valid);

                  if (valid) {
                    setShippingDetails((prev) => ({
                      ...prev,
                      tel: e.target.value,
                    }));
                  }
                }
              }}
              onBlur={() => {
                const valid = isValidPhoneNumber(phone, "NG");
                setPhoneError(!valid);

                if (valid) {
                  setShippingDetails((prev) => ({
                    ...prev,
                    tel: phone,
                  }));
                }
              }}
              onAnimationStart={(e) => {
                if (e.animationName === "onAutoFillStart") {
                  const valid = isValidPhoneNumber(e.target.value, "NG");
                  setPhoneError(!valid);
                  setPhone(e.target.value);
                  if (valid) {
                    setShippingDetails((prev) => ({
                      ...prev,
                      tel: e.target.value,
                    }));
                  }
                }
              }}
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

      <div className="user-info-div">
        <label className="user-state-label" htmlFor="">
          Country:
          <Select
            isDisabled
            styles={dropDownStyles("form", false, true)}
            options={[{ value: "Nigeria", label: "Nigeria" }]}
            value={{
              value: address.country,
              label: address.country,
            }}
          />
        </label>
      </div>

      <div className="user-info-div">
        <label className="user-state-label" htmlFor="state">
          State:
          <Select
            styles={dropDownStyles("form", false, true)}
            value={{ value: address?.state, label: address?.state }}
            isDisabled
          />
        </label>
      </div>
    </article>
  );
}
