import { MenuIcon, CloseMenuIcon } from "./Icons";
import { Link } from "react-router-dom";

export function HeaderMenu({ menuRef, toggleMenu, menuOpenRef, menuCloseRef }) {
  return (
    <>
      <div className="menuIcon" onClick={toggleMenu}>
        <MenuIcon ref={menuOpenRef} />
        <CloseMenuIcon ref={menuCloseRef} />
        <article ref={menuRef} className="hamburger-menu">
          <Link className="link" to="/">
            <div>
              <span className="home">Home</span>
            </div>
          </Link>
          <Link className="link" to="/shop">
            <div className="shopp">
              <span className="shop">Shop</span>
            </div>
          </Link>
          <Link className="link" to="/about">
            <span className="about">About</span>
          </Link>

          <div>
            <span className="contact">Contact</span>
          </div>
        </article>
      </div>
    </>
  );
}
