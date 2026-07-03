import { useState } from "react";
import Select from "react-select";
import {
  getStates,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";
import { convertToNaira } from "../../../utilities/money";
import { dropDownStyles, getShippingOptions } from "../utilities";

export function ShippingOptionsForm({
  address,
  setAddress,
  selectedShipping,
  setSelectedShipping,
}) {
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);

  const doubleError = () => {
    setCityError(true);
    setStateError(true);
  };

  const shippingOptions = getShippingOptions(address.state);
  const states = getStates();
  const stateOptions = states.map((state) => ({ value: state, label: state }));
  const cityOptions = getCitiesAndTownsByState(address?.state).map((city) => ({
    value: city,
    label: city,
  }));

  const handleStateChange = (value) => {
    setAddress((prev) => ({ ...prev, state: value, city: "" }));
    setSelectedShipping(getShippingOptions(value)[0]);
  };

  return (
    <article className="primary-form-container">
      <div className="address-form-container">
        <div className="address-form">
          {/* COUNTRY SELECTION */}
          <div className="form-container">
            <p>Country/Region</p>

            <Select
              value={{ value: address?.country, label: address?.country }}
              styles={dropDownStyles("shippingOpts", false, true)}
              isDisabled
            ></Select>
          </div>
          {/* STATE SELECTION */}
          <div className="form-container">
            <p>
              State<span className="important">*</span>
            </p>
            <Select
              styles={dropDownStyles("shippingOpts", stateError)}
              options={stateOptions}
              value={
                stateOptions.find((opt) => opt.value === address.state) ?? null
              }
              onChange={(selected) => {
                handleStateChange(selected.value);
                setStateError(false);
              }}
              placeholder="Select State"
            />
          </div>
          {/* CITY SELECTION */}
          <div className="form-container">
            <p>
              City<span className="important">*</span>
            </p>

            <Select
              styles={dropDownStyles("shippingOpts", cityError)}
              options={cityOptions}
              value={
                cityOptions.find((opt) => opt.value === address.city) ?? null
              }
              onChange={(selected) => {
                setAddress((prev) => {
                  return {
                    ...prev,
                    city: selected.value,
                  };
                });
                setCityError(false);
              }}
            ></Select>
          </div>
        </div>
      </div>
      {/* SHIPPING OPTIONS */}
      <article className="shipping-options-container">
        {shippingOptions.map((option) => (
          <label
            className="shipping-option-container shipping-radio-and-price"
            key={option.id}
          >
            <div className="shipping-opt-radio">
              <input
                type="radio"
                name="shipping"
                id={option.id}
                checked={selectedShipping?.id === option.id}
                onClick={
                  address?.city
                    ? () => {
                        return "";
                      }
                    : doubleError
                }
                onChange={() => setSelectedShipping(option)}
              />
              <span>
                {option.id}({option.desc}):
              </span>
            </div>
            <span>{convertToNaira(option.costInCents)}</span>
          </label>
        ))}
      </article>
    </article>
  );
}
