import { useState, useEffect } from "react";
import { UseAuth } from "../../../context/AuthContext";
import { DeletionDialog } from "./DeletionDialog";
import { Divider } from "../../general/divider/Divider";
import {
  handleDeletion,
  handleSignOut,
} from "../../../feature/settings/utilities";
import "./AccountTabContent.css";

export const AccountTabContent = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const { signOut, deleteAccount } = UseAuth();

  useEffect(() => {
    if (isDeletionDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDeletionDialogOpen]);

  useEffect(() => {
    if (!isDeletionDialogOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsDeletionDialogOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDeletionDialogOpen]);

  return (
    <>
      <div className="tab-content-details">
        <div className="tab-content-fields-wrapper">
          <div className="account-log-out-wrapper account-content-block-wrapper">
            <div className="log-out-text">
              <h2 className="profile-title">Sign out</h2>
              <p className="profile-desc">
                Sign out of this device. You can sign back in at any time
              </p>
            </div>
            <button
              disabled={isSigningOut}
              type="button"
              onClick={() => {
                handleSignOut(signOut, setIsSigningOut);
              }}
              className="account-action-btn log-out-btn"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
          <Divider />

          {/* Deletion */}
          <div className="account-content-block-wrapper">
            <div>
              <h2 className="profile-title">Danger Zone</h2>
              <p className="profile-desc">Irreversible account actions</p>
            </div>

            <div className="deletion-wrapper account-content-block-wrapper">
              <div className="deletion-text-wrapper">
                <h2 className="profile-title delete-header">
                  Delete your account
                </h2>
                <div className="delete-desc-text profile-desc">
                  <p>Permanently delete your account, and account data.</p>
                  <p>This action cannot be undone.</p>
                </div>
              </div>
              <button
                type="button"
                className="account-delete-btn button-primary account-action-btn"
                onClick={() => {
                  setIsDeletionDialogOpen(true);
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDeletionDialogOpen && (
        <DeletionDialog
          isDeleting={isDeleting}
          setIsDeletionDialogOpen={setIsDeletionDialogOpen}
          handleDeletion={() => {
            handleDeletion(
              signOut,
              setIsDeleting,
              setIsDeletionDialogOpen,
              deleteAccount,
            );
          }}
        />
      )}
    </>
  );
};
