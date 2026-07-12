import { convertToNaira } from "../../../utilities/money";

export function TotalCost({
  cartTotalPrice,
  selectedShipping,
  shippingDetails,
}) {
  return (
    <article className="total-cost">
      <div className="total-cost-child">
        <p>Subtotal:</p>
        <p>{convertToNaira(cartTotalPrice)}</p>
      </div>
      {
        <>
          <div className="total-cost-child">
            <p>Delivery:</p>
            <p>
              {shippingDetails.state
                ? convertToNaira(selectedShipping?.costInCents)
                : convertToNaira(0)}
            </p>
          </div>
          <div className="total-container">
            <p className="total-text">Total:</p>
            <p className="total-amount">
              {selectedShipping?.id
                ? convertToNaira(cartTotalPrice + selectedShipping?.costInCents)
                : convertToNaira(0)}
            </p>
          </div>
        </>
      }
    </article>
  );
}
