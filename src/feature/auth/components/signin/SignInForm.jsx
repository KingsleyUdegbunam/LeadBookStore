import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../../../context/AuthContext";
import { PasswordInput } from "../../../../component/general/inputs/PasswordInput";
import { toast } from "sonner";
import "./SignInForm.css";

export function SignInForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInUser } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.email.trim() && !formValue.password.trim()) {
      toast.warning("Enter your email and password to continue");
      return;
    }
    try {
      const result = await signInUser(formValue.email, formValue.password);
      if (!result.success) {
        toast.error(result.error.message);
        return;
      }

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="signin-form-children">
          {/* Email Field */}
          <div>
            <label htmlFor="email">
              <div>
                Email<span className="important">*</span>
              </div>
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={formValue.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValue((prev) => ({ ...prev, email: value }));
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="password-n-forgot">
            <div>
              <PasswordInput
                id="set-password"
                label="Password"
                value={formValue.password}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValue((prev) => ({ ...prev, password: value }));
                }}
              />
            </div>
          </div>

          <div className="action-btn-helper-n-text">
            <button className="button-primary" disabled={loading} type="submit">
              Sign In
            </button>
            <p className="signup-signin">
              <span className="redirect-text">Don't have an account?</span>{" "}
              <Link className="signup-login-link" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
