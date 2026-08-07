import React from "react";
import { PasswordInput } from "../general/inputs/PasswordInput";

export const SecurityContent = () => {
  return (
    <div className="tab-content-details">
      <div className="tab-content-fields-wrapper">
        <p className="profile-title">Change Password</p>
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Enter current password"
        />
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Enter new password"
        />
        <PasswordInput
          labelClassName="settings-label"
          inputClassName="settings-password"
          label="Confirm new password"
        />
      </div>
    </div>
  );
};
