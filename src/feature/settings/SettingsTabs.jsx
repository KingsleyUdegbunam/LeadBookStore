import React from "react";
import { SETTINGS_TABS } from "../../constants/settings";

export const SettingsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="settings-tab-wrapper">
      <div className="settings-tabs">
        {SETTINGS_TABS.map((tab) => (
          <button
            className={activeTab === tab.id ? "active-setting" : ""}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            key={tab.id}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
