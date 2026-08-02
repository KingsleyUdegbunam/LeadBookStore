import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLongLine } from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import { FaLock } from "react-icons/fa";
import { CartItemsTable } from "../../feature/cart/components/CartItemsTable";
import { CartCostSummary } from "../../feature/cart/components/CartCostSummary";
import "./CartPage.css";

export default function CartPage() {
  const [qtyInputs, setQtyInputs] = useState({});
  const { cart } = useCart();

  useEffect(() => {
    const initial = cart.reduce((acc, cartItem) => {
      acc[cartItem.id] = cartItem.quantity;
      return acc;
    }, {});
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQtyInputs(initial);
  }, [cart]);

  return (
    <>
      <section className="pages-wrapper">
        <article className="cart-product-details cart">
          <article className="page-content-wrapper">
            <div className="cart-page-header">
              <h2 className="cart-header">
                Shopping Cart{" "}
                <span className="small-nav-item-count">{`(${cart.length})`}</span>
              </h2>
              <Link to="/shop" className="navigation">
                <RiArrowLeftLongLine />
                <span className="">Continue Shopping</span>
              </Link>
            </div>
            <CartItemsTable qtyInputs={qtyInputs} setQtyInputs={setQtyInputs} />
          </article>
          <CartCostSummary />
          <Link
            className="button-primary button-full-width checkout-button"
            to="/checkout"
          >
            <FaLock />
            Proceed to Checkout
          </Link>
          <Link
            className="button-full-width checkout-back-to-shop-btn"
            to="/shop"
          >
            Continue Shopping
          </Link>
        </article>
      </section>
    </>
  );
}
