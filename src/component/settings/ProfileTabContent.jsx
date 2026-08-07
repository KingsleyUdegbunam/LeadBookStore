import React from "react";
import { useState } from "react";
import { TextInput } from "../general/inputs/TextInput";

export const ProfileTabContent = ({ user }) => {
  const [profile, setProfile] = useState(() => ({
    firstName: user?.user_metadata?.first_name ?? "",
    lastName: user?.user_metadata?.last_name ?? "",
    email: user?.email ?? "",
  }));

  const isChanged =
    (user?.user_metadata?.first_name !== profile.firstName ||
      user?.user_metadata?.last_name !== profile.lastName) &&
    profile.firstName.trim().length > 1 &&
    profile?.lastName.trim().length > 1;

  return (
    <form className="tab-content-details">
      <div className="tab-content-fields-wrapper">
        <div className="settings-input">
          <TextInput
            id="firstName"
            label="First name"
            value={profile.firstName}
            onChange={(e) => {
              const value = e.target.value;
              setProfile((prev) => ({ ...prev, firstName: value }));
            }}
          />
        </div>

        <div className="settings-input">
          <TextInput
            id="lastName"
            label="Last name"
            value={profile.lastName}
            onChange={(e) => {
              const value = e.target.value;
              setProfile((prev) => ({ ...prev, lastName: value }));
            }}
          />
        </div>

        <div className="settings-input">
          <TextInput
            id="email"
            label="Email"
            disabled={true}
            value={profile.email}
          />

          <p className="profile-email-info">
            Your email address can not be changed
          </p>
        </div>
      </div>
      <div type="submit" className="settings-profile-btn">
        <button disabled={!isChanged} className="button-primary">
          Save changes
        </button>
      </div>
    </form>
  );
};
