import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { PasswordInput } from "../general/inputs/PasswordInput";
import { passwordSchema } from "../../schemas/paswordSchema";
import { toast } from "sonner";

export const SecurityContent = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [shouldValidate, setShouldValidate] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const { changePassword } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = passwordSchema.safeParse(password);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      setShouldValidate(true);
      return;
    }
    setIsSaving(true);
    try {
      const feedback = await changePassword(
        password.currentPassword,
        password.newPassword,
      );
      if (!feedback.success) {
        throw feedback.error;
      }
      setErrors({});
      setShouldValidate(false);
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password successfully changed");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key, value) => {
    const updatedPassword = { ...password, [key]: value };
    setPassword(updatedPassword);

    if (!shouldValidate) return;

    const result = passwordSchema.safeParse(updatedPassword);

    if (result.success) {
      setErrors({});
      return;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    if (key === "newPassword" || key === "confirmPassword") {
      setErrors(fieldErrors);
      return;
    }
    setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));

    return;
  };

  return (
    <form onSubmit={handleSubmit} className="tab-content-details">
      <div className="tab-content-fields-wrapper">
        <p className="profile-title">Change Password</p>
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Enter current password"
          value={password.currentPassword}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("currentPassword", value);
          }}
          error={errors.currentPassword?.[0]}
        />
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Enter new password"
          value={password.newPassword}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("newPassword", value);
          }}
          error={errors.newPassword?.[0]}
        />
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Confirm new password"
          value={password.confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("confirmPassword", value);
          }}
          error={errors.confirmPassword?.[0]}
        />
      </div>
      <div className="settings-profile-btn">
        <button type="submit" disabled={isSaving} className="button-primary">
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
};
