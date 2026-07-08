import Select from "react-select";
import {
  getStates,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";
import { convertToNaira } from "../../../utilities/money";
import { dropDownStyles, getShippingOptions } from "../utilities";

export function ShippingOptionsForm({
  stateError,
  cityError,
  setStateError,
  setCityError,
  shippingDetails,
  setShippingDetails,
  selectedShipping,
  setSelectedShipping,
}) {
  const doubleError = () => {
    setCityError(true);
    setStateError(true);
  };

  const validDeliveryFields = () => {
    !shippingDetails?.city && !shippingDetails?.state
      ? doubleError()
      : shippingDetails?.state && !shippingDetails?.city
        ? setCityError(true)
        : "";
  };

  const shippingOptions = getShippingOptions(shippingDetails?.state);

  const states = getStates();
  const stateOptions = states
    .map((state) => ({ value: state, label: state }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const cityOptions = getCitiesAndTownsByState(shippingDetails?.state)
    .map((city) => ({
      value: city,
      label: city,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleStateChange = (value) => {
    setShippingDetails((prev) => ({ ...prev, state: value, city: "" }));

    shippingDetails?.city && setSelectedShipping(getShippingOptions(value)[0]);
  };

  return (
    <article className="primary-form-container">
      <div className="address-form-container">
        <div className="address-form">
          {/* COUNTRY SELECTION */}
          <div className="form-container">
            <p>Country/Region</p>

            <Select
              value={{
                value: shippingDetails?.country,
                label: shippingDetails?.country,
              }}
              styles={dropDownStyles("shippingOpts", false, true)}
              isDisabled
              isSearchable={false}
            ></Select>
          </div>
          {/* STATE SELECTION */}
          <div className="form-container">
            <p>
              State<span className="important">*</span>
            </p>
            <Select
              isSearchable={false}
              styles={dropDownStyles("shippingOpts", stateError)}
              options={stateOptions}
              value={
                stateOptions.find(
                  (opt) => opt.value === shippingDetails?.state,
                ) ?? null
              }
              onChange={(selected) => {
                handleStateChange(selected.value);
                stateError && setStateError(false);
              }}
              placeholder="Select State"
            />
            {stateError && shippingDetails?.tel && (
              <span className="tel-error">Select a city to continue</span>
            )}
          </div>
          {/* CITY SELECTION */}
          <div className="form-container">
            <p>
              City<span className="important">*</span>
            </p>

            <Select
              isSearchable={false}
              styles={dropDownStyles("shippingOpts", cityError)}
              options={cityOptions}
              value={
                cityOptions.find(
                  (opt) => opt.value === shippingDetails?.city,
                ) ?? null
              }
              onChange={(selected) => {
                setShippingDetails((prev) => {
                  return {
                    ...prev,
                    city: selected.value,
                  };
                });
                cityError && setCityError(false);
              }}
            ></Select>
            {cityError && shippingDetails?.tel && (
              <span className="tel-error">Select a city to continue</span>
            )}
          </div>
        </div>
      </div>
      {/* SHIPPING OPTIONS */}
      <article className="shipping-options-container">
        {shippingOptions.map((option) => (
          <label
            className={`${selectedShipping.id === option.id && "selected-option-highlight"} shipping-option-container shipping-radio-and-price`}
            key={option.id}
          >
            <div className="shipping-opt-radio">
              <input
                className="radio-input"
                type="radio"
                name="shipping"
                id={option.id}
                checked={selectedShipping?.id === option.id}
                onClick={validDeliveryFields}
                onChange={() => {
                  shippingDetails?.city && setSelectedShipping(option);
                }}
              />
              <div>
                <p>
                  <span className="strong">{option.id}:</span>{" "}
                  <span>
                    {`${option.minDeliveryDay} - ${option.maxDeliveryDay} `}
                  </span>
                </p>

                <p className="little-text">({option.desc})</p>
              </div>
            </div>
            <span className="strong carrier-cost">
              {convertToNaira(option.costInCents)}
            </span>
          </label>
        ))}
      </article>
    </article>
  );
}
