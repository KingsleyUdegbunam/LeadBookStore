import { ShippingOptionsForm } from "./ShippingOptionsForm";

export function ShippingOptions({
  deliveryOptionsFormRef,
  stateError,
  cityError,
  setStateError,
  setCityError,
  stateOptions,
  cityOptions,
  selectedShipping,
  setSelectedShipping,
  shippingDetails,
  setShippingDetails,
  showSummary,
}) {
  return (
    <section ref={deliveryOptionsFormRef} className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">{`${showSummary ? "Edit" : "Step 1"}: Delivery Method`}</p>
        <p className="details-subheader">
          {showSummary
            ? "Select a new delivery method"
            : "Choose the shipping option that works best for you"}
        </p>
      </div>
      <ShippingOptionsForm
        stateError={stateError}
        cityError={cityError}
        setStateError={setStateError}
        setCityError={setCityError}
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
