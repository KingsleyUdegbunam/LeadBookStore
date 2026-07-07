export function ActionButton({ isReadyToPay }) {
  return (
    <button type="submit" className={`checkout-continue-btn btn-enabled}`}>
      {isReadyToPay ? "PLACE ORDER" : "CONTINUE"}
    </button>
  );
}
