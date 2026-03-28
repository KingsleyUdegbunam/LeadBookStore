import { useRef } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { SearchIcon, CartIcon } from "./Icons";
import "./Header.css";

export function Header({ cart }) {
  const cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  console.log(cartQuantity);
  const menuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const menuCloseRef = useRef(null);

  return (
    <div className="header-nav">
      <HeaderMenu
        menuRef={menuRef}
        menuOpenRef={menuOpenRef}
        menuCloseRef={menuCloseRef}
      />
      <p className="logo">L</p>
      <div className="nav">
        <SearchIcon />

        <CartIcon cartQuantity={cartQuantity} />
      </div>
    </div>
  );
}
