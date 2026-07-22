import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../../context/AuthContext";
import "./SignInForm.css";

export function SignInForm() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
          </div>

          <div className="action-btn-helper-n-text">
            <button disabled={loading} type="submit">
              Sign In
            </button>
            <p className="signup-login">
              Don't have an account?{" "}
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
