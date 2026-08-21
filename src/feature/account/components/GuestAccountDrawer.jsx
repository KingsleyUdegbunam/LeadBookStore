import Drawer from "../../../component/components/Drawer/Drawer";
import { useNavigate, NavLink } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { ACCOUNT_GUEST_NAV, PRIMARY_NAV } from "../constant";
import { Divider } from "../../../component/general/divider/Divider";
import { NavigationMobile } from "./NavigationMobile";

export function GuestAccountDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const handleSignUpNavigation = () => {
    onClose();
    navigate("/signup");
  };
  const handleSignInNavigation = () => {
    onClose();
    navigate("/signin");
  };

  const handleNavigation = (link) => {
    onClose();

    navigate(link);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="account-drawer-wrapper">
        <div className="drawer-desktop">
          <div className="account-mobile-navigations">
            <header className="account-drawer-header">
              <div className="account-drawer-header-n-close">
                <h1 className="drawer-h1">My Account</h1>
                <button onClick={onClose} className="close-account-drawer">
                  <MdOutlineClose />
                </button>
              </div>
              <Divider />
            </header>
            <main className="account-drawer-main">
              {ACCOUNT_GUEST_NAV.map((nav) => (
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
            </main>
          </div>

          <footer className="account-drawer-footer">
            <div className="account-drawer-buttons-wrapper">
              <button
                onClick={handleSignInNavigation}
                className="button-ghost button-full-width"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUpNavigation}
                className="button-full-width button-primary"
              >
                Create an account
              </button>
            </div>
          </footer>
        </div>

        <div className="drawer-mobile">
          <div className="account-mobile-navigations">
            <header className="account-drawer-header">
              <div className="account-drawer-header-n-close">
                <h1 className="drawer-h1">My Account</h1>
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
                array={ACCOUNT_GUEST_NAV}
                handleNavigation={handleNavigation}
              />
            </main>
          </div>

          <footer className="account-drawer-footer">
            <div className="account-drawer-buttons-wrapper">
              <button
                onClick={handleSignInNavigation}
                className="button-ghost button-full-width"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUpNavigation}
                className="button-full-width button-primary"
              >
                Create an account
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Drawer>
  );
}
