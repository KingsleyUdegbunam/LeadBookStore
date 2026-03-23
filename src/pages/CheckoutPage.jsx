// import { Header } from "../component/Header";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Select from "react-select";
import { isValidPhoneNumber } from "libphonenumber-js";

import {
  getStates,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";
import { convertToNaira } from "../utilities/money";
import "./CheckoutPage.css";

export default function CheckoutPage({
  cart,
  cartInDetail,
  cartTotalPrice,
  getShippingOptions,
}) {
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [address, setAddress] = useState({
    country: "Nigeria",
    state: "",
    city: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    country: address?.country ?? "",
    state: address?.state ?? "",
    city: address?.city ?? "",
  });

  // console.log(isValidPhoneNumber("00003733376", "NG"));
  // console.log(isValidPhoneNumber("08037333768", "NG"));

  const citySelectRef = useRef(null);
  const stateOptionRef = useRef(null);
  const checkoutRef = useRef(null);

  const states = getStates();
  const stateOptions = states.map((state) => ({ value: state, label: state }));
  const cityOptions = getCitiesAndTownsByState(address.state).map((city) => ({
    value: city,
    label: city,
  }));

  //Shipping options only gets set when the user have passed in their state in the select dropdown.
  //This is solely because we need to know if the user is a resident of FCT which have a lower shipping rate.
  const shippingOptions = getShippingOptions(address.state);

  //handleStateChange function takes the user State selection but most importantly, set the city to empty string. This is intentional as leaving a previous city in the address object will be cause false information.
  //Also, we re-evaluate the shipping option again to know if isAbuja is true.
  const handleStateChange = (value) => {
    setAddress((prev) => ({ ...prev, state: value, city: "" }));
    setSelectedShipping(getShippingOptions(value)[0]);
  };

  const handleUpdate = () => {
    setShowForm(false);
  };

  const doubleError = () => {
    setCityError(true);
    setStateError(true);
  };

  const stateStyles = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      borderColor: stateError ? "red" : "acc",
      "&:hover": { borderColor: "red" },
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "red" : "acc",
    }),
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      width: "100%",
      marginInline: "0",
    }),

    container: (base) => ({ ...base, width: "80%" }),
  };

  const cityStyles = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      borderColor: cityError ? "red" : "acc",
      "&:hover": { borderColor: "red" },
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "red" : "acc",
    }),
  };

  console.log(cart);

  return (
    <section className="checkout-section">
      {/* <Header cart={cart} /> */}
      <section className="main-section ">
        <div className="h2-and-link">
          <h2>Your Order</h2>
          <Link className="checkout-links" to={"/cart"}>
            <p>Edit Your Cart</p>
          </Link>
        </div>

        <div className="item-cards">
          {cartInDetail.map((item) => (
            <article key={item.id} className="checkout-item-card">
              <div className="checkout-image-container">
                <img className="img" src={item.coverImage} alt="" />
              </div>
              <div className="item-details">
                <p className="checkout-title">{item.title}</p>
                <p className="checkout-author">{item.author}</p>
                <p className="checkout-price-and-quantity">
                  {item.quantity} x {convertToNaira(item.price.paperback)}{" "}
                  Paperback
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="shipping-details">
          <div className="discount-field-container">
            <div className="discount-field">
              <label htmlFor="discount">
                <input
                  placeholder="Enter Discount Code"
                  type="text"
                  name="discount"
                  id="discount"
                />
              </label>
              <button className="discount-btn">APPLY</button>
            </div>
            <div className="discount-display-text">
              <p>Total Savings: {convertToNaira(0)}*</p>
            </div>
          </div>

          <div className="shipping-option-container">
            <article className="shipping">
              <p className="cart-shipment">Shipment Options</p>
              <div className="shipping-note">
                <p>Delivery within Abuja takes 1-2 working days.</p>
                <p>
                  Book(s) <span className="emphasize-text">above 2kg</span> is
                  likely to attract extra shipping charges.
                </p>
              </div>

              <div className="address-form-container">
                {/* Address display */}
                {!showForm && (
                  <p
                    onClick={() => setShowForm(true)}
                    className="change-address"
                  >
                    Change Address
                  </p>
                )}
                {showForm && (
                  <div className="address-form">
                    <div className="country form-container">
                      <p>Country/Region</p>

                      <Select
                        options={[{ value: "Nigeria", label: "Nigeria" }]}
                        placeholder="Nigeria"
                        value={{ value: "Nigeria", label: "Nigeria" }}
                        onChange={(selected) => {
                          setAddress((prev) => ({
                            ...prev,
                            country: selected.value,
                          }));
                        }}
                      ></Select>
                    </div>

                    <div className="form-container">
                      <p>State*</p>
                      <Select
                        styles={stateStyles}
                        ref={stateOptionRef}
                        options={stateOptions}
                        value={
                          stateOptions.find(
                            (opt) => opt.value === address.state,
                          ) ?? null
                        }
                        onChange={(selected) => {
                          handleStateChange(selected.value);
                          setStateError(false);
                        }}
                        placeholder="Select State"
                      />
                    </div>

                    <div className="form-container">
                      <p>City*</p>

                      <Select
                        styles={cityStyles}
                        ref={citySelectRef}
                        options={cityOptions}
                        value={
                          cityOptions.find(
                            (opt) => opt.value === address.city,
                          ) ?? null
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
                )}
              </div>

              <article className="delivery-options-container">
                {shippingOptions.map((option) => (
                  <label className="shipping-option-container" key={option.id}>
                    <div className="shipping-opt">
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
                <div className="btn-container">
                  <button
                    className={`update-btn-default  ${address.city && "update-btn"}`}
                    onClick={() => {
                      if (!address.state) {
                        setStateError(true);
                        stateOptionRef.current.focus();
                        return;
                      }

                      if (address.city) {
                        handleUpdate();
                      } else {
                        citySelectRef.current.focus();
                        setCityError(true);
                      }
                    }}
                  >
                    Update
                  </button>
                </div>
              </article>

              <article className="total-cost">
                <div className="total-cost-child">
                  <p>Subtotal:</p>
                  <p>{convertToNaira(cartTotalPrice)}</p>
                </div>
                <div className="total-cost-child">
                  <p>Delivery:</p>
                  <p>
                    {selectedShipping?.costInCents
                      ? convertToNaira(selectedShipping?.costInCents)
                      : 0}
                  </p>
                </div>
                <div className="total-container">
                  <p className="total-text">Total:</p>
                  <p className="total-amount">
                    {selectedShipping?.costInCents
                      ? convertToNaira(
                          cartTotalPrice + selectedShipping?.costInCents,
                        )
                      : convertToNaira(0)}
                  </p>
                </div>
              </article>

              <article className="shipping-info">
                <div className="email-container shipping-info-div">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email address"
                  />
                </div>

                <div className="user-name">
                  <div className="first-name">
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" name="first-name" id="first-name" />
                  </div>
                  <div className="first-name">
                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" name="last-name" id="last-name" />
                  </div>
                </div>

                <div className="address shipping-info-div">
                  <label htmlFor="address">Address:</label>
                  <input type="text" name="address" id="address" />
                </div>

                <div className="shipping-info-div">
                  <label htmlFor="telephone">Phone:</label>
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) {
                        setPhoneError(
                          !isValidPhoneNumber(e.target.value, "NG"),
                        );
                      }
                    }}
                    onBlur={() =>
                      setPhoneError(!isValidPhoneNumber(phone, "NG"))
                    }
                    type="tel"
                    name="telephone"
                    id="telephone"
                  />
                  {phoneError && (
                    <span className="tel-error">Invalid phone number</span>
                  )}
                </div>

                <div className="email-container shipping-info-div">
                  <label className="email-state-label" htmlFor="">
                    Country:
                    <Select
                      styles={selectStyles}
                      options={[{ value: "Nigeria", label: "Nigeria" }]}
                      value={{
                        value: address.country,
                        label: address.country,
                      }}
                      isDisabled={true}
                    />
                  </label>
                </div>

                <div className="state-container shipping-info-div">
                  <label className="email-state-label" htmlFor="state">
                    State:
                    <Select
                      styles={selectStyles}
                      options={stateOptions}
                      value={
                        stateOptions.find(
                          (opt) => opt.value === address?.state,
                        ) ?? null
                      }
                      isDisabled={true}
                    />
                  </label>
                </div>
              </article>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}

{
  /* SHIPPING OPTION  */
}

{
  /* <article className="action-btns">
    <Link
      ref={checkoutRef}
      className={`action-btn checkout-link-default ${address.city ? "checkout-link-active" : ""}`}
    >
      <button className="checkout-btn">Checkout</button>
    </Link>
    <Link className="action-btn" to={"/shop"}>
      <button className="shopping-btn">Continue Shopping</button>
    </Link>
  </article> */
}
