import { useState } from "react";
import { truncate } from "../utilities";
export function CheckoutDetailSummary({
  setShowShippingDetailsForm,
  setShowShippingOptForm,
  shippingDetails,
  selectedShipping,
  convertToNaira,
}) {
  const [showFullNotes, setShowFullNotes] = useState(false);
  const notes = shippingDetails.deliveryNotes;
  const truncateText = truncate(notes);

  return (
    <section className="forms-details-summary">
      {/* SHIPPPING DETAILS SUMMARY */}
      <div className="summary-user-details">
        <p className="summary-header">
          Shipping Details{" "}
          <span
            className="checkout-links"
            onClick={() => {
              setShowShippingDetailsForm(true);
            }}
          >
            Edit
          </span>
        </p>

        <div className="user-details">
          <p>
            <strong>Name:</strong> {shippingDetails.firstName}{" "}
            {shippingDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {shippingDetails?.email}
          </p>
          <p>
            <strong>Tel:</strong> {shippingDetails.tel}
          </p>

          <p>
            <strong>Address:</strong> {shippingDetails.address},{" "}
            {shippingDetails?.city}, {shippingDetails?.state},{" "}
            {shippingDetails?.country}
          </p>

          {shippingDetails?.deliveryNotes && (
            <div>
              <strong>Delivery Instructions:</strong>
              <p className="delivery-notes">
                {showFullNotes ? notes : truncateText}
                {/* {shippingDetails.deliveryNotes} */}
              </p>
              <button
                className="truncate-btn"
                type="button"
                onClick={() => {
                  setShowFullNotes(!showFullNotes);
                }}
              >
                {showFullNotes ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SHIPPING OPTIONS SUMMARY */}
      <div className="summary-user-details">
        <p className="summary-header">
          Delivery Method{" "}
          <span
            className="checkout-links"
            onClick={() => {
              setShowShippingOptForm(true);
            }}
          >
            Edit
          </span>
        </p>
        <div className="user-details carrier">
          <div>
            <p>
              <strong>Delivered By: </strong>
              {selectedShipping.id}
            </p>
          </div>

          <div>
            <p>
              <strong>Delivery Window: </strong>
              {`${selectedShipping.minDeliveryDay} – ${selectedShipping.maxDeliveryDay}`}
            </p>
            <p className="little-text">({selectedShipping.desc})</p>
          </div>

          <div>
            <p>
              <strong>Delivery Fee: </strong>{" "}
              {convertToNaira(selectedShipping.costInCents)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
