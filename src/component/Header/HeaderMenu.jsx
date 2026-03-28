import { MenuIcon, CloseMenuIcon } from "./Icons";
import { Link } from "react-router-dom";

export function HeaderMenu({ menuRef, menuOpenRef, menuCloseRef }) {
  const toggleMenu = () => {
    menuRef.current.classList.toggle("view-menu");
    menuOpenRef.current.classList.toggle("close-menu-icon");
    document.body.classList.toggle("lock-scroll");
    menuCloseRef.current.classList.toggle("display-close-icon");
  };

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
          <div>
            <span className="about">About</span>
          </div>
          <div>
            <span className="contact">Contact</span>
          </div>
        </article>
      </div>
    </>
  );
}
