import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../../context/AuthContext";
import Drawer from "../../../component/components/Drawer/Drawer";
import { handleSignOut } from "../../settings/utilities";
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
      title: "Settings",
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
        <header className="authenticated-header">
          <div className="account-drawer-header-n-close">
            <h1>Hi {user}!</h1>
            <button onClick={onClose} className="close-account-drawer">
              <MdOutlineClose />
            </button>
          </div>
        </header>

        <div className="authenticated-nav-footer">
          <nav>
            <ul className="drawer-links-wrapper">
              {accountNav.map((nav) => (
                <button
                  key={nav.link}
                  className="drawer-nav-links button-full-width"
                  onClick={() => handleNavigation(nav.link)}
                >
                  <div className="drawer-li-text">
                    <p>{nav.title}</p>
                    <p className="account-nav-subtext">{nav.desc}</p>
                  </div>

                  <BsChevronRight className="drawer-nav-icons" />
                </button>
              ))}
            </ul>
          </nav>

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
      </div>
    </Drawer>
  );
}
