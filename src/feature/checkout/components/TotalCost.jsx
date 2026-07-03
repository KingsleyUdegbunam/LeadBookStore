import { convertToNaira } from "../../../utilities/money";

export function TotalCost({ cartTotalPrice, selectedShipping }) {
  return (
    <article className="total-cost">
      <div className="total-cost-child">
        <p>Subtotal:</p>
        <p>{convertToNaira(cartTotalPrice)}</p>
      </div>
      <div className="total-cost-child">
        <p>Delivery:</p>
        <p>{convertToNaira(selectedShipping?.costInCents)}</p>
      </div>
      <div className="total-container">
        <p className="total-text">Total:</p>
        <p className="total-amount">
          {selectedShipping?.costInCents
            ? convertToNaira(cartTotalPrice + selectedShipping?.costInCents)
            : convertToNaira(0)}
        </p>
      </div>
    </article>
  );
}
