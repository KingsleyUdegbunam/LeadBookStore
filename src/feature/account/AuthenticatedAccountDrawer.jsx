import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

export function AuthenticatedAccountDrawer({ isOpen, onClose, user, email }) {
  const accountNav = [
    { title: "Orders", desc: "Track and view your orders", link: "" },
    { title: "Addresses", desc: "Manage your saved addreses", link: "" },
    {
      title: "Account Settings",
      desc: "Manage your account details",
      link: "",
    },
  ];
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="account-drawer-wrapper">
        <header>
          <div className="account-drawer-header-n-close">
            <h1>Hi, {user}</h1>
            <button onClick={onClose} className="close-account-drawer">
              <MdOutlineClose />
            </button>
          </div>
          <p className="account-drawer-subtext">{email}</p>

          <div className="account-drawer-buttons-wrapper">
            <button className="button-primary">Sign In</button>
            <p className="new-here-login">
              New here?{" "}
              <Link className="account-drawer-link" to="">
                Create an account
              </Link>
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

        <footer className="account-drawer-footer">
          <button className="button-secondary">Sign Out</button>
        </footer>
      </div>
    </Drawer>
  );
}
