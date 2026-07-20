import { SignUpForm } from "../../../feature/auth/signup/SignUpForm";
import "./SignUpPage.css";

export default function SignUpPage() {
  return (
    <section className="auth-section">
      <div>
        <h1>Create Your Account</h1>
        <p className="subheader">
          Create an account to track this order and future purchases.
        </p>
      </div>
      <SignUpForm />
    </section>
  );
}
