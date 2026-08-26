import { convertToNaira } from "../../../utilities/money";
import { updateCartItemQty, deleteItem } from "../utilities";
import { RiSubtractLine } from "react-icons/ri";
import { RiAddLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import "./CartItem.css";

export function CartItem({
  cartInDetailItem,
  qtyInputs,
  setQtyInputs,
  cart,
  setCart,
}) {
  const cartItem = cart.find((item) => item.id === cartInDetailItem.id);

  const commitQuantity = (cartItem, value) => {
    const cartItemId = cartItem.id;
    const index = cart.findIndex((item) => item.id === cartItemId);
    if (value.trim() === "") {
      setQtyInputs((prev) => ({
        ...prev,
        [cartItemId]:
          cart.find((item) => item.id === cartItemId)?.quantity ?? 1,
      }));
      return;
    }

    updateCartItemQty(Number(value), cartItem, setCart, index);
  };

  const quantityStepper = (operation) => {
    const value = Number(qtyInputs[cartItem.id]);
    const index = cart.findIndex((item) => item.id === cartItem.id);

    if (operation === "minus") {
      const newValue = value - 1;
      updateCartItemQty(newValue, cartItem, setCart, index);
    } else if (operation === "add") {
      const newValue = value + 1;
      updateCartItemQty(newValue, cartItem, setCart, index);
    }
  };
  return (
    <article className="cart-item-wrapper">
      {/* Image */}
      <div className="cart-image-container">
        <img
          src={cartInDetailItem.coverImage}
          alt={`${cartInDetailItem.title} book cover`}
        />
      </div>
      <div className="author-price-wrapper">
        {/* Title & Author */}
        <div className="cart-item-title-author">
          <p className="cart-item-title">{cartInDetailItem.title}</p>
          <p className="author">{cartInDetailItem.author}</p>
        </div>

        {/* Prica n Input wrapper */}
        <div className="price-n-stepper-wrapper">
          {/* Quantity control */}

          {/* Total price */}
          <p className="cart-item-total">
            {convertToNaira(cartInDetailItem.totalPrice)}
          </p>

          <div className="cart-item-quantity-control">
            <button
              className="quantity-stepper-icon"
              onClick={() => {
                quantityStepper("minus");
              }}
            >
              <RiSubtractLine />
            </button>
            <input
              id={cartItem.id}
              className="qty-input"
              value={qtyInputs[cartItem.id] ?? cartItem.quantity}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                commitQuantity(cartItem, e.target.value, qtyInputs);
              }}
              onBlur={(e) => {
                commitQuantity(cartItem, e.target.value);
              }}
              onChange={(e) => {
                setQtyInputs((prev) => ({
                  ...prev,
                  [cartItem.id]: e.target.value,
                }));
              }}
              type="number"
              min={0}
            />
            <button
              className="quantity-stepper-icon"
              onClick={() => {
                quantityStepper("add");
              }}
            >
              <RiAddLine />
            </button>
          </div>

          <span className="cart-item-price cart-desktop">
            {convertToNaira(cartInDetailItem.price.paperback)}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          deleteItem(cartItem.id, setCart);
        }}
        className="delete-item"
      >
        <RiDeleteBinLine />
      </button>
    </article>
  );
}
