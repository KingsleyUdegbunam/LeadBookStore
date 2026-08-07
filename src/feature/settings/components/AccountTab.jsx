import React from "react";
import { TabContentHeader } from "../../../component/settings/TabContentHeader";
import { AccountTabContent } from "../../../component/settings/AccountTabContent";
import { SETTINGS_SECTIONS } from "../../../constants/settings";
import { MdOutlineManageAccounts } from "react-icons/md";

export const AccountTab = () => {
  return (
    <section className="settings-tab-content">
      <TabContentHeader
        {...SETTINGS_SECTIONS.account}
        icon={<MdOutlineManageAccounts size={20} />}
      />
      <AccountTabContent />
    </section>
  );
};
