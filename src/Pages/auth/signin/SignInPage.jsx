import { SignInForm } from "../../../feature/auth/components/signin/SignInForm";

export default function SignInPage() {
  return (
    <section className="auth-section pages-wrapper">
      <div>
        <h1>Welcome Back!</h1>
        <p className="subheader">
          Sign in to access your orders and manage your account.
        </p>
      </div>
      <SignInForm />
    </section>
  );
}
