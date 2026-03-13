import { useRef } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const menuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const menuCloseRef = useRef(null);

  const toggleMenu = () => {
    console.log(menuRef.current);
    console.log("yes");
    console.log(menuCloseRef.current);
    console.log(menuOpenRef.current);

    menuRef.current.classList.toggle("view-menu");
    menuOpenRef.current.classList.toggle("close-menu-icon");
    document.body.classList.toggle("lock-scroll");
    menuCloseRef.current.classList.toggle("display-close-icon");
  };

  const cartIcon = () => (
    <svg
      className="icon cart-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
    </svg>
  );

  const searchIcon = () => (
    <svg
      className="icon search-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );

  const menuIcon = () => (
    <svg
      ref={menuOpenRef}
      className="icon open-menu-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  );

  const closeMenuIcon = () => (
    <svg
      ref={menuCloseRef}
      className="icon close-menu-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );

  return (
    <div className="header-nav">
      <p className="logo">L</p>
      <div className="nav">
        <div className="cartIcon">{cartIcon()}</div>

        <div className="searchIcon">{searchIcon()}</div>
        <div className="menuIcon" onClick={toggleMenu}>
          {menuIcon()}
          {closeMenuIcon()}
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
      </div>
    </div>
  );
}
