import { HiOutlineTruck } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { IoBagCheckOutline } from "react-icons/io5";
import { PostCheckoutSignUpForm } from "../../../component/auth/PostCheckoutSignUpForm";
import "./SignUpPostCheckout.css";

export function SignUpPostCheckoutForm({ prefilledEmail, lastName }) {
  return (
    <section className="post-checkout-signup-section">
      <div className="signup-header-wrapper">
        <div>
          <h2 className="signup-header">Create an Account</h2>
          <p className="signup-checkout-subheader">
            Create an account to track this order and future purchases.
          </p>
        </div>
        <div className="signup-benefits">
          <div>
            <HiOutlineTruck className="post-checkout-icon" />
            <p>Easily Track Orders</p>
          </div>

          <div>
            <GoHistory className="post-checkout-icon" />
            <p>View Order History</p>
          </div>

          <div>
            <IoBagCheckOutline className="post-checkout-icon" />
            <p>Faster Checkout</p>
          </div>
        </div>
      </div>
      <PostCheckoutSignUpForm
        prefilledEmail={prefilledEmail}
        lastName={lastName}
      />
    </section>
  );
}
