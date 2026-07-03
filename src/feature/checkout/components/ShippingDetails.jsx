import { Link } from "react-router-dom";
import { ShippingDetailsForm } from "./ShippingDetailsForm";
export function ShippingDetails({
  address,
  shippingDetails,
  setShippingDetails,
}) {
  return (
    <section className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">Step 2: Shipping Details</p>
        <p className="account-action">
          <Link className="checkout-links"> Login</Link> or{" "}
          <Link className="checkout-links">create an account</Link> for faster
          checkout.
        </p>
      </div>
      <ShippingDetailsForm
        address={address}
        shippingDetails={shippingDetails}
        setShippingDetails={setShippingDetails}
      />
    </section>
  );
}
