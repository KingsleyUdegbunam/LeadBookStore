import { NavLink } from "react-router-dom";
export const NavigationMobile = ({ array, onClose }) => {
  return (
    <ul className="nav-mobile">
      {array.map((nav) => {
        return (
          <NavLink
            to={nav.link}
            key={nav.link}
            className={({ isActive }) =>
              `nav-drawer drawer-nav-links ${
                isActive ? "header-pages-link active-page" : "header-pages-link"
              }`
            }
            onClick={onClose}
          >
            {nav.title}
          </NavLink>
        );
      })}
    </ul>
  );
};
