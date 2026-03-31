import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertToNaira } from "../utilities/money";
import { Header } from "../component/Header/Header";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import "./CartPage.css";
import { Footer } from "../component/Footer";

export default function CartPage({
  cart,
  setCart,
  cartInDetail,
  cartTotalPrice,
  getShippingOptions,
}) {
  const [qtyInputs, setQtyInputs] = useState({});

  useEffect(() => {
    const initial = cart.reduce((acc, cartItem) => {
      acc[cartItem.id] = cart.quantity;
      return acc;
    }, {});
    setQtyInputs(initial);
  }, [cart]);

  const deleteItem = (cartItem) => {
    setCart((prev) => prev.filter((book) => book.id !== cartItem.id));
  };

  const updateCartItemQty = (newQty, cartItem) => {
    if (newQty < 1) {
      deleteItem(cartItem);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: newQty, totalPrice: item.basePrice * newQty }
          : item,
      ),
    );
  };

  return (
    <div>
      <section className="cart">
        <article className="main-section cart-product-details">
          <article className="cart-items-holder">
            <h2 className="cart-header">Your Cart</h2>

            <article className="cart-items-container">
              <div className="navigations">
                <div className="shop-nav cart-nav">
                  <FiChevronLeft color="red" />
                  <span className="functional-btn">Keep Shopping</span>
                </div>
                <div className="cart-nav">
                  <span className="functional-btn">Checkout</span>
                  <FiChevronRight color="red" />
                </div>
              </div>
              {cartInDetail.map((cartItem, key) => {
                return (
                  <div className="cart-items-wraper" key={key}>
                    <article className="cart-item-container">
                      <div className="cart-image-container">
                        <img src={cartItem.coverImage} alt="" />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-title">{cartItem.title}</p>
                        <div className="product-about">
                          <p className="author">by {cartItem.author}</p>
                          <p className="book-type">
                            {cartItem.primaryCollection}
                          </p>
                          <p className="genre">{cartItem.genre}</p>
                        </div>
                      </div>
                      <div className="cart-item-details cost-update">
                        <span className="cart-item-price">
                          {convertToNaira(cartItem.price.paperback)}
                        </span>
                        <div className="cart-item-quantity-and-update">
                          <div className="cart-item-quantity-update">
                            <label>Qty</label>{" "}
                            <input
                              value={
                                qtyInputs[cartItem.id] ?? cartItem.quantity
                              }
                              onChange={(e) => {
                                setQtyInputs((prev) => ({
                                  ...prev,
                                  [cartItem.id]: e.target.value,
                                }));
                              }}
                              type="number"
                              min={1}
                            />
                          </div>

                          <p
                            className="functional-btn update-item-quantity-btn"
                            onClick={() => {
                              updateCartItemQty(
                                Number(qtyInputs[cartItem.id]),
                                cartItem,
                              );
                            }}
                          >
                            Update
                          </p>
                        </div>
                      </div>
                    </article>
                    <span
                      onClick={() => {
                        deleteItem(cartItem);
                      }}
                      className="functional-btn"
                    >
                      Remove
                    </span>
                  </div>
                );
              })}
            </article>
          </article>
          <div className="promo-code">
            <input
              className="promo-code-input"
              placeholder="Enter Promo Code"
              type="text"
            />
            <button className="promo-code-btn">Apply</button>
          </div>

          <div className="cart-cost-wrapper">
            <div className="cart-item-summary">
              <div className="cart-cost-summary-flex">
                <p className="subtotal-text">Subtotal:</p>
                <p className="subtotal-value">
                  {convertToNaira(cartTotalPrice)}
                </p>
              </div>
              <div className="estimated-delivery cart-cost-summary-flex">
                <p className="">Estimated Shipping:</p>
                <p>
                  {cartTotalPrice
                    ? convertToNaira(
                        getShippingOptions("FCT (Abuja)")[0].costInCents,
                      )
                    : convertToNaira(0)}
                </p>
              </div>
            </div>
            <div className="estimated-total">
              <p>Estimated Total:</p>
              <p>
                {cartTotalPrice
                  ? convertToNaira(
                      getShippingOptions("FCT (Abuja)")[0].costInCents +
                        cartTotalPrice,
                    )
                  : convertToNaira(0)}
              </p>
            </div>
          </div>
          <Link to="/checkout">
            <button className="checkout-button">CHECKOUT</button>
          </Link>
        </article>
      </section>

      <section className="cart-summary">
        <article className="cart-total-summary"></article>
      </section>
    </div>
  );
}
