import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../../../context/AuthContext";
import { PasswordInput } from "../../../../component/general/inputs/PasswordInput";
import { TextInput } from "../../../../component/general/inputs/TextInput";
import { toast } from "sonner";
import {
  validateEmail,
  validatePassword,
} from "../../../../lib/validation/validation";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

export function PrimarySignUpForm({ prefilledEmail }) {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { signUpNewUser } = UseAuth();

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
    setIsSigningUp(true);
    try {
      const result = await signUpNewUser(
        formValue.email,
        formValue.password,
        formValue.firstName,
        formValue.lastName,
      );
      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/");
        return;
      }
      toast.error(result.error.message ?? result.error);
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
            {/* First Name */}
            <div className="first-last-name-signup">
              <div>
                <TextInput
                  id="firstName"
                  label="First Name"
                  value={formValue.firstName}
                  important={true}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, firstName: value }));
                  }}
                />
              </div>
              {/* Last Name */}
              <div>
                <TextInput
                  id="lastName"
                  label="Last Name"
                  value={formValue.lastName}
                  important={true}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormValue((prev) => ({ ...prev, lastName: value }));
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <TextInput
                id="email"
                label="Email"
                value={formValue.email}
                important={true}
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
            disabled={isSigningUp}
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
            className="signup-btn button-primary"
            type="submit"
          >
            {isSigningUp ? "Creating Account..." : "Create Account"}
          </button>
          <p className="signup-signin">
            <span className="redirect-text">Already have an account?</span>{" "}
            <Link className="signup-login-link" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
