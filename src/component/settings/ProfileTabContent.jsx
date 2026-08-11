import { useState } from "react";
import { TextInput } from "../general/inputs/TextInput";
import { UseAuth } from "../../context/AuthContext";
import { profileSchema } from "../../schemas/ProfileSchema";
import { toast } from "sonner";

export const ProfileTabContent = ({ user }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState(() => ({
    firstName: user?.user_metadata?.first_name ?? "",
    lastName: user?.user_metadata?.last_name ?? "",
    email: user?.email ?? "",
  }));

  const { updateProfile } = UseAuth();

  const isChanged =
    user?.user_metadata?.first_name !== profile.firstName ||
    user?.user_metadata?.last_name !== profile.lastName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    const result = profileSchema.safeParse(profile);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);
    try {
      const updateResult = await updateProfile(result.data);
      if (!updateResult.success) {
        throw updateResult.error;
      }
      toast.success("Profile updated successfully");
    } catch (e) {
      toast.eror(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onChange = (key, value) => {
    const newValues = { ...profile, [key]: value };
    setProfile(newValues);

    if (!errors[key]) return;
    const result = profileSchema.safeParse(newValues);

    if (result.success) {
      setErrors({});
      return;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    const field = fieldErrors[key];

    if (!field) {
      setErrors((prev) => ({ ...prev, [key]: null }));
      return;
    }
    setErrors(fieldErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="tab-content-details">
      <div className="tab-content-fields-wrapper">
        <div className="settings-input">
          <TextInput
            id="firstName"
            label="First name"
            value={profile.firstName}
            error={errors.firstName?.[0]}
            onChange={(e) => {
              const value = e.target.value;
              onChange("firstName", value);
            }}
          />
        </div>

        <div className="settings-input">
          <TextInput
            id="lastName"
            label="Last name"
            value={profile.lastName}
            error={errors.lastName?.[0]}
            onChange={(e) => {
              const value = e.target.value;
              onChange("lastName", value);
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
      <div className="settings-profile-btn">
        <button
          type="submit"
          disabled={!isChanged || isSaving}
          className="button-primary"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
};
