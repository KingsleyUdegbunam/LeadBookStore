import React from "react";
import { CartItem } from "./CartItem";
import { useCart } from "../../../context/CartContext";
import "./CartItemsTable.css";

export const CartItemsTable = ({ qtyInputs, setQtyInputs }) => {
  const { cart, setCart, cartInDetail, addToCart } = useCart();

  return (
    <article className="cart-items-container">
      <div className="cart-item-header">
        <p className="cart-header-row-1-2">Product</p>
        <p className="cart-header-row-3">Price</p>
        <p className="cart-header-row-4">Quantity</p>
        <p className="cart-header-row-5">Total</p>
        <p className="transparent-header">total</p>
      </div>
      {cartInDetail.map((cartInDetailItem, key) => {
        return (
          <CartItem
            cart={cart}
            cartInDetailItem={cartInDetailItem}
            addToCart={addToCart}
            qtyInputs={qtyInputs}
            setQtyInputs={setQtyInputs}
            setCart={setCart}
            key={key}
          />
        );
      })}
    </article>
  );
};
