import { useState, useRef, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  validateEmail,
  validatePassword,
} from "../../../lib/validation/validation";
import { UseAuth } from "../../../context/AuthContext";

export function PrimarySignUpForm({ prefilledEmail }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signUpNewUser } = UseAuth();

  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  //Save form details
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState({ message: "", valid: false });

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  let prefilledChanged;
  if (prefilledEmail) {
    const result = formValue.email === prefilledEmail;
    prefilledChanged = !result;
  }

  useEffect(() => {
    if (!prefilledEmail) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormValue((prev) => ({ ...prev, email: prefilledEmail }));
  }, [prefilledEmail]);

  //Toggle password visibility
  const togglePasswordVisibility = (which) => {
    switch (which) {
      case "password":
        setIsVisible((prev) => ({ ...prev, password: !prev.password }));
        break;
      case "confirmPassword":
        setIsVisible((prev) => ({
          ...prev,
          confirmPassword: !prev.confirmPassword,
        }));
        break;
    }
  };

  //Check if both password field match
  const doesValuesMatch = (value1, value2) => value1 === value2;

  const hasStartedTyping = {
    email: formValue.email.length > 0,
    password: formValue.password.length > 0,
  };

  const passwordCheck = validatePassword(formValue.password);
  const passwordFeedback = [
    { valid: passwordCheck.minLength, text: "At least 8 characters" },
    { valid: passwordCheck.maxLength, text: "No more than 128 characters" },
    {
      valid: passwordCheck.hasUppercase,
      text: "At least one uppercase letter",
    },
    {
      valid: passwordCheck.hasLowercase,
      text: "At least one lowercase letter",
    },
    { valid: passwordCheck.hasDigit, text: "At least one number" },
    {
      valid: passwordCheck.hasSpecialCharacters,
      text: "At least one special character",
    },
    { valid: passwordCheck.hasNoSpaces, text: "No spaces" },
    {
      valid: doesValuesMatch(formValue.password, formValue.confirmPassword),
      text: "Password matches",
    },
  ];

  const isPasswordValid = Object.values(passwordCheck).every(Boolean);
  const isEmailValid = validateEmail(formValue.email).valid;

  const isValidDetails = isEmailValid && isPasswordValid;

  //HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDetails) return;
    setLoading(true);
    try {
      const result = await signUpNewUser(
        formValue.email,
        formValue.password,
        formValue.firstName,
      );
      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/");
      }
      toast.error(result.error.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-section">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <article className="signup-input-fields-wrapper">
            {/* First Name */}
            <div>
              <label htmlFor="firstName">
                <div>
                  First Name<span className="important">*</span>
                </div>
              </label>
              <div className="input-wrapper">
                <input
                  ref={emailInputRef}
                  type="text"
                  id="firstName"
                  value={formValue.firstName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, firstName: value }));
                  }}
                />
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName">
                <div>
                  Last Name<span className="important">*</span>
                </div>
              </label>
              <div className="input-wrapper">
                <input
                  ref={emailInputRef}
                  type="text"
                  id="lastName"
                  value={formValue.lastName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, lastName: value }));
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email">
                <div>
                  Email<span className="important">*</span>
                </div>
              </label>
              <div className="input-wrapper">
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  value={formValue.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, email: value }));

                    if (emailError.valid) {
                      const { valid, message } = validateEmail(value);
                      setEmailError({ ...message, valid: !valid });
                    }
                  }}
                  onBlur={() => {
                    const isValid = validateEmail(formValue.email);
                    if (!isValid.valid) {
                      setEmailError({
                        ...isValid,
                        valid: !isValid.valid,
                      });
                    }
                  }}
                />
              </div>
              <div className="feedback-outer">
                {!prefilledEmail ? (
                  <div className="feedback">
                    {!hasStartedTyping.email ? (
                      "-"
                    ) : emailError.valid ? (
                      <FcCancel />
                    ) : (
                      <FcCheckmark />
                    )}
                    <p>Valid email address</p>
                  </div>
                ) : (
                  <div>
                    {!prefilledChanged && (
                      <p className="feedback feedback-email">
                        This is the email used for your order. You can change it
                        if needed.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="set-password">
                Password<span className="important">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  ref={passwordInputRef}
                  type={isVisible.password ? "text" : "password"}
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
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {isVisible.password ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password">
                Confirm Password<span className="important">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  ref={confirmPasswordInputRef}
                  type={isVisible.confirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={formValue.confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({
                      ...prev,
                      confirmPassword: value,
                    }));
                    doesValuesMatch(formValue.password, value);
                  }}
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {isVisible.confirmPassword ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
          </article>
          {hasStartedTyping.password && (
            <div className="feedback-container">
              {passwordFeedback.map(({ valid, text }) => (
                <div className="feedback">
                  {!hasStartedTyping.password ? (
                    "-"
                  ) : valid ? (
                    <FcCheckmark />
                  ) : (
                    <FcCancel />
                  )}
                  <p>{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          disabled={loading}
          onClick={() => {
            if (!isEmailValid) {
              emailInputRef?.current.focus();
              return;
            }

            if (!isPasswordValid) {
              passwordInputRef?.current.focus();
              return;
            }

            if (
              !doesValuesMatch(formValue.password, formValue.confirmPassword)
            ) {
              confirmPasswordInputRef?.current.focus();
              return;
            }
          }}
          className="signup-btn"
          type="submit"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="signup-login">
          Already have an account?{" "}
          <Link className="signup-login-link" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
