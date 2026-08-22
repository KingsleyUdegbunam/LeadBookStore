import { FaLock } from "react-icons/fa";
import "./ActionButton.css";

export function ActionButton({ isReadyToPay, loading }) {
  return (
    <button
      disabled={loading}
      type="submit"
      className="button-primary button-full-width checkout-btn"
    >
      {loading ? (
        "Processing..."
      ) : isReadyToPay ? (
        <span className="place-order-btn button-full-width">
          <FaLock /> Place Order
        </span>
      ) : (
        "Continue"
      )}
    </button>
  );
}
