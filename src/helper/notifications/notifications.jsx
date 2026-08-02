import { toast } from "sonner";
import { RiDeleteBinLine } from "react-icons/ri";
import "./notifications.css";

export function bookRemovedToast(undo) {
  toast(
    <div className="book-removed-toast-left">
      <span className="delete-icon-wrapper">
        <RiDeleteBinLine size={18} />
      </span>{" "}
      <span>Book removed from your cart.</span>
    </div>,
    {
      action: {
        label: "Undo",
        onClick: undo,
      },
    },
  );
}
