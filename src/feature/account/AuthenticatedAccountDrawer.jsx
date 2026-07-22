import { BsChevronRight } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import Drawer from "../../component/components/Drawer/Drawer";
import { UseAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import "./AuthenticatedAccountDrawer.css";

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
  const { signOut } = UseAuth();
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (!result.success) {
        toast.error("Sign out failed. Try  again.");
        return;
      }
      toast.success("Signed out successfully!");
    } catch (err) {
      toast.error(err.message);
    }
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
          <p className="account-drawer-subtext">{email}</p>
        </header>
        <div className="authenticated-nav-footer">
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
            <button onClick={handleSignOut} className="button-secondary">
              Sign Out
            </button>
          </footer>
        </div>
      </div>
    </Drawer>
  );
}
