import { useCart } from "../../context/CartContext";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";
import "./Header.css";

export function Header() {
  const { cart } = useCart();

  const cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  return (
    <>
      <header className="header-wrapper">
        <HeaderMobile cartQuantity={cartQuantity} />
        <HeaderDesktop cartQuantity={cartQuantity} />
      </header>
    </>
  );
}
