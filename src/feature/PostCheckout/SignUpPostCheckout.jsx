import { HiOutlineTruck } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { IoBagCheckOutline } from "react-icons/io5";
import { PostCheckoutSignUpForm } from "../../component/auth/PostCheckoutSignUpForm";

export function SignUpPostCheckoutForm() {
  return (
    <section className="signup-section">
      <div className="signup-header-wrapper">
        <div>
          <h2 className="signup-header">Create an Account</h2>
          <p className="signup-checkout-subheader">
            Create an account to track this order and future purchases.
          </p>
        </div>
        <div className="signup-benefits">
          <div className="">
            <HiOutlineTruck />
            <p>Easily Track Orders</p>
          </div>

          <div className="">
            <GoHistory />
            <p>View Order History</p>
          </div>

          <div className="">
            <IoBagCheckOutline />
            <p>Faster Checkout</p>
          </div>
        </div>
      </div>
      <PostCheckoutSignUpForm />
    </section>
  );
}
