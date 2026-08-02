import { MenuIcon, CloseMenuIcon } from "./Icons";
import { Link } from "react-router-dom";
import "./HeaderMenu.css";

export function HeaderMenu({ menuRef, toggleMenu, menuOpenRef, menuCloseRef }) {
  const menuOptions = [
    { page: "Home", link: "/" },
    { page: "Shop", link: "/shop" },
    { page: "About", link: "/about" },
    { page: "Contact", link: "/contact" },
  ];
  return (
    <>
      <div className="menu-icon" onClick={toggleMenu}>
        <MenuIcon ref={menuOpenRef} />
        <CloseMenuIcon ref={menuCloseRef} />
        <article ref={menuRef} className="hamburger-menu">
          {menuOptions.map((item) => (
            <Link
              key={item.link}
              className={`${item.page.toLowerCase()} link`}
              to={item.link}
            >
              <span>{item.page}</span>
            </Link>
          ))}
        </article>
      </div>
    </>
  );
}
