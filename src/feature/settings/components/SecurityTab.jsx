import { TabContentHeader } from "../../../component/settings/TabContentHeader";
import { SecurityContent } from "../../../component/settings/SecurityContent";
import { MdSecurity } from "react-icons/md";
import { SETTINGS_SECTIONS } from "../../../constants/settings";

export const SecurityTab = () => {
  return (
    <section className="settings-tab-content">
      <TabContentHeader
        {...SETTINGS_SECTIONS.security}
        icon={<MdSecurity size={18} />}
      />

      <SecurityContent />
    </section>
  );
};
