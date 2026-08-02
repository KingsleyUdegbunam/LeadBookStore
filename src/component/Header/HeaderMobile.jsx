import React from "react";
import { HeaderMenu } from "./HeaderMenu";
import { SearchIcon, CartIcon } from "./Icons";
import { FaRegUser } from "react-icons/fa6";
import { BrandLogo } from "../brand-logo/BrandLogo";
import { useUI } from "../../context/UIContext";
import "./HeaderMobile.css";

export const HeaderMobile = ({
  menuRef,
  menuOpenRef,
  menuCloseRef,
  toggleSearchBar,
  cartQuantity,
  toggleMenu,
}) => {
  const { setOpenAccountDrawer } = useUI();
  return (
    <div className="header-mobile pages-wrapper-variation">
      {/* Logo */}
      <div className="menu-toggle-n-logo">
        <HeaderMenu
          toggleMenu={toggleMenu}
          menuRef={menuRef}
          menuOpenRef={menuOpenRef}
          menuCloseRef={menuCloseRef}
        />
        <BrandLogo variant={"dark"} />
      </div>

      {/* Header right */}
      <div className="nav">
        <SearchIcon
          toggleMenu={toggleMenu}
          toggleSearchBar={toggleSearchBar}
          menuRef={menuRef}
        />

        <button
          onClick={() => setOpenAccountDrawer(true)}
          className="header-account"
        >
          <FaRegUser />
        </button>

        <CartIcon cartQuantity={cartQuantity} />
      </div>
    </div>
  );
};
