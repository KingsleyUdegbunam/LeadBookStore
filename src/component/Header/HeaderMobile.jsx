import { BrandLogo } from "../brand-logo/BrandLogo";
import { UseUI } from "../../context/UIContext";
import { RiMenuLine } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { ImSearch } from "react-icons/im";
import { NavLink } from "react-router-dom";
import "./HeaderMobile.css";

export const HeaderMobile = ({ cartQuantity }) => {
  const { setOpenAccountDrawer, setOpenSearchDrawer } = UseUI();
  return (
    <div className="header-mobile pages-wrapper-variation">
      {/* Logo */}
      <div className="menu-toggle-n-logo">
        <BrandLogo variant={"dark"} />
      </div>

      {/* Header right */}
      <div className="nav">
        <button
          onClick={() => setOpenSearchDrawer(true)}
          className="header-account"
        >
          <ImSearch size={19} />
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

              <TiShoppingCart size={22} />
            </div>
          </div>
        </NavLink>

        <button
          onClick={() => setOpenAccountDrawer(true)}
          className="header-account"
        >
          <RiMenuLine size={20} />
        </button>
      </div>
    </div>
  );
};
