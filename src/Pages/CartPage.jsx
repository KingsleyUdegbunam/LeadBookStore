import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertToNaira } from "../utilities/money";
import { capitalizeWords } from "../utilities/capitalizeWords";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import "./CartPage.css";

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
    <>
      <section className="cart">
        <article className="main-section cart-product-details">
          <article className="cart-items-holder">
            <h2 className="cart-header">Your Cart</h2>
            <div className="navigations">
              <button className="shop-nav cart-nav">
                <FiChevronLeft className="chevron-icon" />
                <span className="">Keep Shopping</span>
              </button>
              <button className="cart-nav">
                <span className="">Checkout</span>
                <FiChevronRight className="chevron-icon" />
              </button>
            </div>
            <article className="cart-items-container">
              {cartInDetail.map((cartItem, key) => {
                return (
                  <div className="cart-items-wrapper" key={key}>
                    <article className="cart-item-container">
                      <div className="item-img-and-details">
                        <div className="cart-image-container">
                          <img
                            src={cartItem.coverImage}
                            alt={`${cartItem.title} book cover`}
                          />
                        </div>
                        <div className="cart-item-details">
                          <div>
                            <p className="cart-item-title">{cartItem.title}</p>
                            <p className="author">by {cartItem.author}</p>
                          </div>
                          <div className="product-about">
                            <p className="book-type">
                              {capitalizeWords(cartItem.primaryCollection)}
                            </p>
                            <p className="genre">
                              {capitalizeWords(cartItem.genre)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="cost-update">
                        <span className="cart-item-price">
                          {convertToNaira(cartItem.price.paperback)}
                        </span>
                        <div className="cart-item-quantity-and-update">
                          <div className="cart-item-quantity-update">
                            <label>Qty:</label>{" "}
                            <input
                              className="qty-input"
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
                    <div
                      onClick={() => {
                        deleteItem(cartItem);
                      }}
                      className="delete-item"
                    >
                      <IoTrashBin />
                      <span>Remove</span>
                    </div>
                  </div>
                );
              })}
            </article>
          </article>

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
    </>
  );
}
