import { MenuIcon, CloseMenuIcon } from "./Icons";
import { Link } from "react-router-dom";

export function HeaderMenu({ menuRef, toggleMenu, menuOpenRef, menuCloseRef }) {
  const menuOptions = [
    { page: "Home", link: "/" },
    { page: "Shop", link: "/shop" },
    { page: "About", link: "/about" },
    { page: "Contact", link: "/contact" },
  ];
  return (
    <>
      <div className="menuIcon" onClick={toggleMenu}>
        <MenuIcon ref={menuOpenRef} />
        <CloseMenuIcon ref={menuCloseRef} />
        <article ref={menuRef} className="hamburger-menu">
          {menuOptions.map((item) => (
            <Link className={`${item.page.toLowerCase()} link`} to={item.link}>
              <span>{item.page}</span>
            </Link>
          ))}
        </article>
      </div>
    </>
  );
}
