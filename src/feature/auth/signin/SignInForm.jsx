import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "./SignInForm.css";

export function SignInForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email.trim() && !formValue.password.trim()) {
      toast.warning("Enter your email and password to continue");
      return;
    }
  };

  return (
    <section className="signup-section">
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
              <label htmlFor="set-password">
                Password<span className="important">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type={isVisible ? "text" : "password"}
                  id="set-password"
                  value={formValue.password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, password: value }));
                  }}
                />

                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
            <Link className="forgot-password auth-helper-text" to="">
              Forgot Password?
            </Link>
          </div>

          <button type="submit">Sign In</button>
        </div>
      </form>
    </section>
  );
}
