import { ShippingOptionsForm } from "./ShippingOptionsForm";

export function ShippingOptions({
  stateOptions,
  cityOptions,
  selectedShipping,
  setSelectedShipping,
  shippingDetails,
  setShippingDetails,
}) {
  return (
    <section className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">Step 1: Delivery Method</p>
        <p className="details-subheader">
          Choose the shiping option that works best for you
        </p>
      </div>
      <ShippingOptionsForm
        stateOptions={stateOptions}
        cityOptions={cityOptions}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
        shippingDetails={shippingDetails}
        setShippingDetails={setShippingDetails}
      />
    </section>
  );
}
