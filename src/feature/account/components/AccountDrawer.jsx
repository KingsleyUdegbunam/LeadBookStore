import { UseAuth } from "../../../context/AuthContext";
import "./AccountDrawer.css";
import { AuthenticatedAccountDrawer } from "./AuthenticatedAccountDrawer";
import { GuestAccountDrawer } from "./GuestAccountDrawer";

export function AccountDrawer({ isOpen, onClose }) {
  const { session } = UseAuth();
  const user = session?.user?.user_metadata.first_name || "Reader";
  const id = session?.access_token;
  if (id)
    return (
      <AuthenticatedAccountDrawer
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
    );
  return <GuestAccountDrawer isOpen={isOpen} onClose={onClose} />;
}
