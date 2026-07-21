import "./AccountDrawer.css";
import { AuthenticatedAccountDrawer } from "./AuthenticatedAccountDrawer";
import { GuestAccountDrawer } from "./GuestAccountDrawer";

export function AccountDrawer({ isOpen, onClose, user, email }) {
  if (user)
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
