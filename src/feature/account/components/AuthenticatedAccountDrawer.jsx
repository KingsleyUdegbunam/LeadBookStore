import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UseAuth } from "../../../context/AuthContext";
import Drawer from "../../../component/components/Drawer/Drawer";
import { handleSignOut } from "../../settings/utilities";
import { Divider } from "../../../component/general/divider/Divider";
import { NavigationMobile } from "./NavigationMobile";
import { ACCOUNT_AUTHENTICATED_NAV, PRIMARY_NAV } from "../constant";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import "./AuthenticatedAccountDrawer.css";

export function AuthenticatedAccountDrawer({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const accountNav = [
    {
      title: "Orders",
      desc: "Track and view your orders",
      link: "/account/orders",
    },
    {
      title: "Account",
      desc: "Manage your account details",
      link: "/account/settings",
    },
  ];
  const { signOut } = UseAuth();
  const handleNavigation = (link) => {
    onClose();

    navigate(link);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="account-drawer-wrapper authenticated-account-drawer-wrapper">
        <div className="drawer-desktop">
          <div>
            <header className="authenticated-header">
              <div className="account-drawer-header-n-close">
                <h1 className="drawer-h1">Hi {user}!</h1>
                <button onClick={onClose} className="close-account-drawer">
                  <MdOutlineClose />
                </button>
              </div>
            </header>

            <main className="authenticated-nav-footer">
              <nav>
                <ul className="drawer-links-wrapper">
                  {accountNav.map((nav) => (
                    <NavLink
                      to={nav.link}
                      key={nav.link}
                      className={({ isActive }) =>
                        `drawer-nav-links button-full-width ${
                          isActive
                            ? "header-pages-link active-page"
                            : "header-pages-link"
                        }`
                      }
                      onClick={onClose}
                    >
                      <div className="drawer-li-text">
                        <p>{nav.title}</p>
                        <p className="account-nav-subtext">{nav.desc}</p>
                      </div>

                      <BsChevronRight className="drawer-nav-icons" />
                    </NavLink>
                  ))}
                </ul>
              </nav>
            </main>
          </div>
          <footer className="account-drawer-footer">
            <button
              onClick={() => handleSignOut(signOut, setIsSigningOut)}
              disabled={isSigningOut}
              className="button-ghost button-full-width"
            >
              {isSigningOut ? "Sign out..." : " Sign out"}
            </button>
          </footer>
        </div>

        <div className="drawer-mobile">
          <div className="account-mobile-navigations">
            <header className="account-drawer-header">
              <div className="account-drawer-header-n-close">
                <h1 className="drawer-h1">Hi {user}!</h1>
                <button onClick={onClose} className="close-account-drawer">
                  <MdOutlineClose />
                </button>
              </div>
              <Divider />
            </header>
            <main className="account-drawer-main">
              <NavigationMobile
                onClose={onClose}
                array={PRIMARY_NAV}
                handleNavigation={handleNavigation}
              />
              <Divider />

              <NavigationMobile
                onClose={onClose}
                array={ACCOUNT_AUTHENTICATED_NAV}
                handleNavigation={handleNavigation}
              />
            </main>
          </div>

          <footer className="account-drawer-footer">
            {/* <Divider /> */}
            <button
              onClick={() => handleSignOut(signOut, setIsSigningOut)}
              disabled={isSigningOut}
              className="button-ghost button-full-width"
            >
              {isSigningOut ? "Sign out..." : " Sign out"}
            </button>
          </footer>
        </div>
      </div>
    </Drawer>
  );
}
