import { useState } from "react";
import { SettingsTabs } from "../../../feature/settings/components/SettingsTabs";
import { AccountTab } from "../../../feature/settings/components/AccountTab";
import { SecurityTab } from "../../../feature/settings/components/SecurityTab";
import { ProfileTab } from "../../../feature/settings/components/ProfileTab";
import "./Settings.css";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section className="pages-wrapper settings-page-wrapper">
      <h2>Settings</h2>
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="settings-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "account" && <AccountTab />}
      </div>
    </section>
  );
};
