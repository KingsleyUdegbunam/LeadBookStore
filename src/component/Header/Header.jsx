import { useRef } from "react";
import { useCart } from "../../context/CartContext";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";
import "./Header.css";
import { HeaderSearchResult } from "../../feature/header/HeaderSearchResult";

export function Header() {
  const { cart } = useCart();

  const cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const menuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const menuCloseRef = useRef(null);
  const headerSearchRef = useRef(null);
  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("view-menu");
    menuOpenRef.current.classList.toggle("close-menu-icon");
    document.body.classList.toggle("lock-scroll");
    menuCloseRef.current.classList.toggle("display-close-icon");
  };

  const toggleSearchBar = () => {
    headerSearchRef.current.classList.add("reveal-overlay-search");
    searchInputRef.current.focus();

    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <header className="header-wrapper">
        <HeaderMobile
          menuRef={menuRef}
          menuOpenRef={menuOpenRef}
          menuCloseRef={menuCloseRef}
          toggleSearchBar={toggleSearchBar}
          toggleMenu={toggleMenu}
          cartQuantity={cartQuantity}
        />
        <HeaderDesktop
          toggleMenu={toggleMenu}
          toggleSearchBar={toggleSearchBar}
          menuRef={menuRef}
          cartQuantity={cartQuantity}
        />
      </header>
      <HeaderSearchResult
        headerSearchRef={headerSearchRef}
        searchInputRef={searchInputRef}
      />
    </>
  );
}
