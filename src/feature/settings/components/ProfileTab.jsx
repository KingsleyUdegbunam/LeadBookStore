import { TabContentHeader } from "../../../component/settings/TabContentHeader";
import { ProfileTabContent } from "../../../component/settings/ProfileTabContent";
import { SETTINGS_SECTIONS } from "../../../constants/settings";
import { FiUser } from "react-icons/fi";
import { UseAuth } from "../../../context/AuthContext";

export const ProfileTab = () => {
  const { session } = UseAuth();

  return (
    <section className="settings-tab-content">
      <TabContentHeader
        {...SETTINGS_SECTIONS.profile}
        icon={<FiUser size={18} />}
      />
      <ProfileTabContent user={session.user} />
    </section>
  );
};
