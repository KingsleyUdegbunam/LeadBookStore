import "./ActionButton.css";

export function ActionButton({ isReadyToPay, loading }) {
  return (
    <button disabled={loading} type="submit" className="value-btn checkout-btn">
      {loading ? "Processing..." : isReadyToPay ? "PLACE ORDER" : "CONTINUE"}
    </button>
  );
}
