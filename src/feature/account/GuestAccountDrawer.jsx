import Drawer from "../../component/components/Drawer/drawer";
import { useNavigate } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

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

  const accountNav = [
    { title: "Track Order", desc: "Check your order status", link: "" },
    { title: "Addresses", desc: "Manage your saved addreses", link: "" },
    {
      title: "Account Settings",
      desc: "Sign in to manage your account",
      link: "",
    },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="account-drawer-wrapper">
        <header>
          <div className="account-drawer-header-n-close">
            <h1>My Account</h1>
            <button onClick={onClose} className="close-account-drawer">
              <MdOutlineClose />
            </button>
          </div>
          <p className="account-drawer-subtext">
            Sign in to track orders,and save your details
          </p>

          <div className="account-drawer-buttons-wrapper">
            <button onClick={handleSignInNavigation} className="button-primary">
              Sign In
            </button>
            <p className="new-here-login">
              New here?{" "}
              <button
                onClick={handleSignUpNavigation}
                className="account-drawer-link"
              >
                Create an account
              </button>
            </p>
          </div>
        </header>
        <nav>
          <ul>
            {accountNav.map((nav) => (
              <li>
                <div>
                  <p>{nav.title}</p>
                  <p className="account-nav-subtext">{nav.desc}</p>
                </div>
                <BsChevronRight />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Drawer>
  );
}
