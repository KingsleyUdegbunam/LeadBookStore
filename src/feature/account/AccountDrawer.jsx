import { UseAuth } from "../../context/AuthContext";
import "./AccountDrawer.css";
import { AuthenticatedAccountDrawer } from "./AuthenticatedAccountDrawer";
import { GuestAccountDrawer } from "./GuestAccountDrawer";

export function AccountDrawer({ isOpen, onClose, email }) {
  const { session } = UseAuth();
  const user = session?.user?.user_metadata.display_name || "Reader";
  const id = session?.access_token;
  if (id)
    return (
      <AuthenticatedAccountDrawer
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        email={email}
      />
    );
  return <GuestAccountDrawer isOpen={isOpen} onClose={onClose} />;
}
