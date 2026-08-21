import React from "react";
import { BrandLogo } from "../brand-logo/BrandLogo";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { UseUI } from "../../context/UIContext";
import { PRIMARY_NAV } from "../../feature/account/constant";
import { TiShoppingCart } from "react-icons/ti";
import { ImSearch } from "react-icons/im";
import "./HeaderDesktop.css";

export const HeaderDesktop = ({ cartQuantity }) => {
  const { setOpenAccountDrawer, setOpenSearchDrawer } = UseUI();

  return (
    <div className="header-desktop pages-wrapper-variation">
      {/* Logo */}

      <BrandLogo variant={"dark"} />

      <nav>
        <ul className="header-desktop-links">
          {PRIMARY_NAV.map((item) => {
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
        <button
          onClick={() => setOpenSearchDrawer(true)}
          className="header-account"
        >
          <ImSearch size={19} />
        </button>
        <button
          onClick={() => setOpenAccountDrawer(true)}
          className="header-account"
        >
          <FaRegUser size={18} />
        </button>

        <NavLink
          to={"/cart"}
          className={({ isActive }) =>
            `header-account ${
              isActive ? "header-pages-link active-page" : "header-pages-link"
            }`
          }
        >
          <div className="cartIcon">
            <div className="cart">
              <span className="cart-item-number">
                {cartQuantity > 0 ? cartQuantity : ""}
              </span>

              <TiShoppingCart size={20} />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
