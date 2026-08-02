import React from "react";
import { BrandLogo } from "../brand-logo/BrandLogo";
import { SearchIcon, CartIcon } from "./Icons";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useUI } from "../../context/UIContext";
import "./HeaderDesktop.css";

export const HeaderDesktop = ({
  toggleMenu,
  toggleSearchBar,
  menuRef,
  cartQuantity,
}) => {
  const { setOpenAccountDrawer } = useUI();
  const headerMenuOptions = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <div className="header-desktop pages-wrapper-variation">
      {/* Logo */}

      <BrandLogo variant={"dark"} />

      <nav>
        <ul className="header-desktop-links">
          {headerMenuOptions.map((item) => {
            return (
              <li className="header-links" key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `header-pages-link ${
                      isActive
                        ? "header-pages-link active-page"
                        : "header-pages-link"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
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
