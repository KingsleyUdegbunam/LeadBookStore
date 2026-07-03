export function CheckoutDetailSummary({
  setShowShipDetailsForm,
  setShowShippingOptForm,
  shippingDetails,
  selectedShipping,
  convertToNaira,
}) {
  return (
    <section className="forms-details-summary">
      {/* SHIPPPING DETAILS SUMMARY */}
      <div className="summary-user-details">
        <p className="summary-header">
          Shipping Details{" "}
          <span
            className="checkout-links"
            onClick={() => {
              setShowShipDetailsForm(true);
            }}
          >
            Edit
          </span>
        </p>
        <p>
          {shippingDetails.firstName} {shippingDetails.lastName}
        </p>
        <p>{shippingDetails.address}</p>
        <p>{shippingDetails.tel}</p>
      </div>

      {/* SHIPPING OPTIONS SUMMARY */}
      <div className="summary-user-details">
        <p className="summary-header">
          Shipping Options{" "}
          <span
            className="checkout-links"
            onClick={() => {
              setShowShippingOptForm(true);
            }}
          >
            Edit
          </span>
        </p>
        <p>{convertToNaira(selectedShipping.costInCents)}</p>
        <p>{selectedShipping.desc}</p>
      </div>
    </section>
  );
}
