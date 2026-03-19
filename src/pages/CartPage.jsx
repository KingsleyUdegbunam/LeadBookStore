import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../component/Header";
import { books } from "../data/inventory";
import { convertToNaira } from "../utilities/money";
import { deliveryOption } from "../data/delivery";
import {
  getStates,
  getCities,
  getCitiesAndTownsByState,
} from "nigerian-states-lgas-cities-towns";
import "./CartPage.css";

export default function CartPage({ cart, setCart }) {
  const [address, setAddress] = useState({
    country: "Nigeria",
    state: "",
    city: "",
  });

  const [selectedShipping, setSelectedShipping] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const states = getStates();
  // const cities = getCitiesAndTownsByState()
  console.log(states);

  const getShippingOptions = (state) => {
    const isAbuja = state === "FCT (Abuja)";

    return [
      {
        id: "DHL",
        desc: "2-5 Working Days",
        costInCents: isAbuja ? 1000000 : 1500000,
      },
      {
        id: "KOS",
        desc: "4-7 Working Days",
        costInCents: isAbuja ? 350000 : 650000,
      },
      {
        id: "Shipbubble",
        desc: "7-10 Working Days",
        costInCents: isAbuja ? 400000 : 650000,
      },
    ];
  };

  const shippingOptions = getShippingOptions(address.state);

  const handleStateChange = (e) => {
    setAddress((prev) => ({ ...prev, state: e.target.value, city: "" }));
    setSelectedShipping(getShippingOptions(e.target.value)[0]);
  };

  const handleUpdate = () => {
    setShowForm(false);
  };

  const deleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
    </svg>
  );
  const cartInDetail = cart.map((cartItem) => {
    const book = books.find((book) => book.id === cartItem.id);

    return { ...book, quantity: cartItem.quantity };
  });

  const deleteItem = (cartItem) => {
    setCart((prev) => prev.filter((book) => book.id !== cartItem.id));
  };

  const updateQuantity = (sign, cartItem) => {
    setCart((prev) => {
      console.log(cart);
      switch (sign) {
        case "add":
          return prev.map((item) =>
            item.id === cartItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.basePrice * (item.quantity + 1),
                }
              : item,
          );
        case "subtract":
          if (cartItem.quantity === 1) {
            return prev.filter((item) => item.id !== cartItem.id);
          }

          return prev.map((item) => {
            return item.id === cartItem.id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: item.basePrice * (item.quantity - 1),
                }
              : item;
          });

        default:
          return prev;
      }
    });
  };

  const cartTotalPrice = cart.reduce((total, cartItem) => {
    return cartItem.totalPrice + total;
  }, 0);

  return (
    <>
      <Header cart={cart} />

      <section className="cart">
        <article className="main-section cart-product-details">
          <article className="cart-items-holder">
            <div className="product-header">
              <span className="">product</span>
              <span className="">quantity</span>
            </div>
            {cartInDetail.map((cartItem, key) => {
              console.log(cartItem.id);
              return (
                <article key={key} className="cart-product">
                  <>
                    <div className="cart-image-container">
                      <span
                        onClick={() => {
                          deleteItem(cartItem);
                        }}
                        className="delete-icon"
                      >
                        {deleteIcon()}
                      </span>
                      <img
                        className="cart-product-image"
                        src={cartItem.coverImage}
                        alt=""
                      />
                    </div>
                    <div className="cart-title-and-price">
                      <span className="cartitem-title">{cartItem.title}</span>
                      <div className="cartitem-quantity">
                        <span>{cartItem.quantity}x</span>
                        <span className="cartitem-price">
                          {convertToNaira(cartItem.price.paperback)}
                        </span>
                      </div>
                    </div>
                    <div className="quantity-increment">
                      <span
                        onClick={() => {
                          updateQuantity("add", cartItem);
                        }}
                        className="quantity-increment-tool"
                      >
                        +
                      </span>
                      <span className="item-quantity">{cartItem.quantity}</span>
                      <span
                        onClick={() => {
                          updateQuantity("subtract", cartItem);
                        }}
                        className="quantity-increment-tool"
                      >
                        -
                      </span>
                    </div>
                  </>
                </article>
              );
            })}
          </article>
        </article>
      </section>

      <section className="cart-summary">
        <article className="cart-total-summary">
          <div className="cart-subtotal-row">
            <span className="subtotal-text">Subtotal:</span>
            <span className="subtotal-value">
              {convertToNaira(cartTotalPrice)}
            </span>
          </div>
        </article>
        <article className="shipping">
          <article>
            <p className="cart-shipment">Shipment Options</p>
            <div className="shipping-note">
              <p>Delivery within Abuja takes 1-2 working days</p>
              <p>
                Book(s) <span className="emphasize-text">above 2kg</span> is
                likely to attract extra shipping charges.
              </p>
            </div>
            <article className="delivery-option">
              {/* {deliveryOption.map((option) => (
                <div className="option">
                  <div>
                    <label htmlFor={option.id}></label>
                    <input
                      value={option.costInCents}
                      type="radio"
                      name={option.id}
                      id={option.id}
                      checked={option.id === selectedShipping.id}
                      onChange={() => setSelectedShipping(option)}
                    />
                    <span>{option.id}</span>
                    <span>({option.desc}):</span>
                  </div>

                  <span className="shipping-option-cost">
                    {convertToNaira(option.costInCents)}
                  </span>
                </div>
              ))} */}
              {shippingOptions.map((option) => (
                <label key={option.id}>
                  <div>
                    <input
                      type="radio"
                      name="shipping"
                      id={option.id}
                      checked={selectedShipping?.id === option.id}
                      onChange={() => setSelectedShipping(option)}
                    />
                    <span>
                      {option.id}({option.desc}):
                    </span>
                  </div>
                  <span>{convertToNaira(option.costInCents)}</span>
                </label>
              ))}
              {/* Address display */}
              {showForm && (
                <div>
                  <select
                    value={address.country}
                    onChange={(e) => {
                      setAddress((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }));
                    }}
                  >
                    <option value="Nigeria">Nigeria</option>
                  </select>

                  <select value={address.state} onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    name="city"
                    value={address.city}
                    onChange={(e) => {
                      setAddress((prev) => ({ ...prev, city: e.target.value }));
                    }}
                  >
                    <option value="">Select City</option>
                    {getCitiesAndTownsByState(address.state).map((city) => (
                      <option value={city} key={city}>
                        {city}
                      </option>
                    ))}
                  </select>

                  <button onClick={handleUpdate}>Update</button>
                </div>
              )}
            </article>

            <article className="total-cost">
              <div className="total-cost-child">
                <p>Subtotal:</p>
                <p>{convertToNaira(cartTotalPrice)}</p>
              </div>
              <div className="total-cost-child">
                <p>Delivery:</p>
                <p>
                  {cartTotalPrice
                    ? convertToNaira(selectedShipping.costInCents)
                    : convertToNaira(0)}
                </p>
              </div>
              <div className="total-container">
                <p className="total-text">Total:</p>
                <p className="total-amount">
                  {cartTotalPrice
                    ? convertToNaira(
                        cartTotalPrice + selectedShipping.costInCents,
                      )
                    : convertToNaira(0)}
                </p>
              </div>
            </article>
          </article>
        </article>

        <article className="action-btns">
          <Link className="action-btn checkout-link">
            <button className="checkout-btn">Checkout</button>
          </Link>
          <Link className="action-btn" to={"/shop"}>
            <button className="shopping-btn">Continue Shopping</button>
          </Link>
        </article>
      </section>
    </>
  );
}
