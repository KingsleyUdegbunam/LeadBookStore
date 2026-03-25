// import { Header } from "../component/Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { use, useRef, useState } from "react";
import Select from "react-select";
import { isValidPhoneNumber } from "libphonenumber-js";

import {
  getStates,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";
import Paystack from "@paystack/inline-js";
import { convertToNaira } from "../utilities/money";
import { supabase } from "../supabase";

import "./CheckoutPage.css";

export default function CheckoutPage({
  cart,
  cartInDetail,
  cartTotalPrice,
  getShippingOptions,
}) {
  const [selectedShipping, setSelectedShipping] = useState(null);
  // const [showForm, setShowForm] = useState(true);
  const [showShipDetailsForm, setShowShipDetailsForm] = useState(true);
  const [showShippingOptForm, setShowShippingOptForm] = useState(true);

  const [showSummary, setShowSummary] = useState(false);

  const hideForms = () => {
    setShowShipDetailsForm(false);
    setShowShippingOptForm(false);
  };

  const isReadyToPay = !showShipDetailsForm && !showShippingOptForm;

  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();
  const popup = new Paystack();
  console.log(popup);

  const initiatePayment = () => {
    popup.checkout({
      key: "pk_test_87b24dad8322dd4a245702d85bd6035e9af5650b",
      email: shippingDetails.email,
      amount: cartTotalPrice + selectedShipping.costInCents,
      onSuccess: async (transaction) => {
        console.log(transaction);
        try {
          const { error } = await supabase.from("orders").insert({
            reference: transaction.reference,
            shipping_fee: selectedShipping.costInCents,
            amount: cartTotalPrice,
            total: cartTotalPrice + selectedShipping.costInCents,
            items: cart,
            shipping_details: { ...address, ...shippingDetails },
            status: "pending",
            created_at: new Date(),
          });
          if (error) throw error;

          navigate("/order-confirmation");
        } catch (error) {
          console.error("Error saving order:", error);
        }

        alert("done");
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        alert("onCancel");
      },
      onError: (error) => {
        console.log("Error: ", error.message);
        alert("Nah");
      },
    });
  };

  const [address, setAddress] = useState({
    country: "Nigeria",
    state: "",
    city: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    tel: "",
  });

  const isFormValid =
    address.state.trim() !== "" &&
    address.city.trim() !== "" &&
    shippingDetails.email.trim() !== "" &&
    shippingDetails.firstName.trim() !== "" &&
    shippingDetails.lastName.trim() !== "" &&
    shippingDetails.address.trim() !== "" &&
    shippingDetails.tel.trim() !== "";

  console.log(shippingDetails);
  console.log(address);

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
          {/* DISCOUNT FIELD */}
          {!isReadyToPay && (
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
                <button className="discount-btn-default">APPLY</button>
              </div>
              <div className="discount-display-text">
                <p>Total Savings: {convertToNaira(0)}*</p>
              </div>
            </div>
          )}

          {/* COST DIPSPLAY */}
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

          {showSummary && (
            <section className="forms-details-summary">
              {/* SHIPPPING DETAILS SUMMARY */}
              <div className="summary-user-details">
                <p className="summary-header">
                  Shipping Details{" "}
                  <span
                    className="checkout-links"
                    onClick={() => {
                      setShowShipDetailsForm(true);
                    }}
                  >
                    Edit
                  </span>
                </p>
                <p>
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </p>
                <p>{shippingDetails.address}</p>
                <p>{shippingDetails.tel}</p>
              </div>

              {/* SHIPPING OPTIONS SUMMARY */}
              <div className="summary-user-details">
                <p className="summary-header">
                  Shipping Options{" "}
                  <span
                    className="checkout-links"
                    onClick={() => {
                      setShowShippingOptForm(true);
                    }}
                  >
                    Edit
                  </span>
                </p>
                <p>{convertToNaira(selectedShipping.costInCents)}</p>
                <p>{selectedShipping.desc}</p>
              </div>
            </section>
          )}

          {/*SHIPPING OPTIONS FORM */}
          {showShippingOptForm && (
            <section className="form-section-container">
              <div className="form-header-container">
                <p className="step1 cart-shipment">Step 1: Shipment Options</p>
              </div>

              <article className="primary-form-container">
                <div className="address-form-container">
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
                </div>

                <article className="delivery-options-container">
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
            </section>
          )}

          {/* SHIPPING DETAILS FORM */}
          {showShipDetailsForm && (
            <section className="form-section-container">
              <div className="form-header-container">
                <p className="step1 cart-shipment">Step 2: Shipping Details</p>
                <p className="account-action">
                  <Link className="checkout-links"> Login</Link> or{" "}
                  <Link className="checkout-links">create an account</Link> for
                  faster checkout.
                </p>
              </div>
              <article className="primary-form-container">
                <div className="email-container user-info-div">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={shippingDetails.email}
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
                    value={shippingDetails.firstName}
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
                    value={shippingDetails.lastName}
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
                    value={shippingDetails.address}
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
                            const valid = isValidPhoneNumber(
                              e.target.value,
                              "NG",
                            );
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
                            const valid = isValidPhoneNumber(
                              e.target.value,
                              "NG",
                            );
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

                <div className="user-info-div">
                  <label className="user-state-label" htmlFor="state">
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
            </section>
          )}

          <button
            disabled={!isFormValid}
            className={`checkout-page-btn-disabled cheeckout-continue-btn ${isFormValid && "btn-enabled"}`}
            onClick={() => {
              if (isFormValid) {
                if (isReadyToPay) {
                  initiatePayment();
                  return;
                }
                hideForms();
                setShowSummary(true);
              }
            }}
          >
            {isReadyToPay ? "PLACE ORDER" : "CONTNUE"}
          </button>
        </div>
      </section>
    </section>
  );
}
