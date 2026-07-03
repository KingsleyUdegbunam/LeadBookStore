import { ShippingOptionsForm } from "./ShippingOptionsForm";

export function ShippingOptions({
  address,
  setAddress,
  stateOptions,
  cityOptions,
  selectedShipping,
  setSelectedShipping,
}) {
  return (
    <section className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">Step 1: Shipment Options</p>
      </div>
      <ShippingOptionsForm
        address={address}
        setAddress={setAddress}
        stateOptions={stateOptions}
        cityOptions={cityOptions}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
      />
    </section>
  );
}
