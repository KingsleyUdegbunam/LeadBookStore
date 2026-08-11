import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { PasswordInput } from "../general/inputs/PasswordInput";
import {
  validateEmail,
  validatePassword,
} from "../../lib/validation/validation";
import { toast } from "sonner";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import "./PostCheckoutSignUpForm.css";
import { TextInput } from "../general/inputs/TextInput";

export function PostCheckoutSignUpForm({
  prefilledEmail,
  firstName,
  lastName,
}) {
  const { signUpNewUser } = UseAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  //Save form details
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  useEffect(() => {
    if (!prefilledEmail) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormValue((prev) => ({ ...prev, email: prefilledEmail }));
  }, [prefilledEmail]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDetails) return;
    setIsSigningUp(true);
    try {
      const result = await signUpNewUser(
        formValue.email,
        formValue.password,
        lastName,
        firstName,
      );
      if (result.success) {
        setFormValue({ email: "", password: "", confirmPassword: "" });
        toast.success("Account created successfully!");
        return;
      }
      toast.error(result.error.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <section>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="validation-and-inputs">
          <article className="signup-input-fields-wrapper">
            <div>
              <TextInput
                id="email"
                label="Email"
                value={formValue.email}
                disabled={true}
              />
            </div>

            <PasswordInput
              id="set-password"
              label="Password"
              value={formValue.password}
              ref={passwordInputRef}
              onChange={(e) => {
                const value = e.target.value;
                setFormValue((prev) => ({ ...prev, password: value }));
              }}
            />

            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              value={formValue.confirmPassword}
              ref={confirmPasswordInputRef}
              onChange={(e) => {
                const value = e.target.value;
                setFormValue((prev) => ({
                  ...prev,
                  confirmPassword: value,
                }));
                doesValuesMatch(formValue.password, value);
              }}
            />
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
        <div className="post-checkout-actions-wrapper">
          <button
            onClick={() => {
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
            disabled={isSigningUp}
            className="signup-btn button-primary"
            type="submit"
          >
            {isSigningUp ? "Creating Account..." : "Create Account"}
          </button>
          <p className="signup-signin">
            <span className="redirect-text">Already have an account?</span>{" "}
            <Link className="signup-login-link" to="/signin">
              Sign in.
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
