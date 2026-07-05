import { Link } from "react-router-dom";
import { ShippingDetailsForm } from "./ShippingDetailsForm";
export function ShippingDetails({ shippingDetails, setShippingDetails }) {
  return (
    <section className="form-section-container">
      <div className="form-header-container">
        <p className="step1 cart-shipment">Step 2: Shipping Details</p>
        <p className="details-subheader">Tell us where to deliver your order</p>
      </div>
      <div className="auth-cta-checkout">
        <p className="account-action">
          Already have an account?{" "}
          <Link className="checkout-links">Log in</Link> for a faster checkout.
        </p>
        <ShippingDetailsForm
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
        />
      </div>
    </section>
  );
}
