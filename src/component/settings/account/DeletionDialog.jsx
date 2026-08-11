import { MdOutlineDelete } from "react-icons/md";
import "./DeletionDialog.css";

export const DeletionDialog = ({
  isDeleting,
  setIsDeletionDialogOpen,
  handleDeletion,
}) => {
  return (
    <div className="deletion-dialog-wrapper">
      <div className="account-deletion-dialog">
        <div className="deletion-dialog-icon">
          <MdOutlineDelete />
        </div>
        <h2>Delete account?</h2>
        <div className="deletion-dialog-text">
          <p>
            Your account and personal data will be permanently deleted. Your
            orders will remain available for guest tracking.
          </p>
          <p>
            This action{" "}
            <span className="emphasize-text">cannot be undone.</span>
          </p>
        </div>
        <div className="deletion-dialog-btns">
          <button
            disabled={isDeleting}
            className="button-ghost"
            onClick={() => {
              setIsDeletionDialogOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            className="button-primary"
            onClick={handleDeletion}
          >
            {isDeleting ? "Deleting..." : "Delete account"}
          </button>
        </div>
      </div>
    </div>
  );
};
