import * as S from "../../styles/Settings/SettingsPage";

export type SettingsTab = "elderly" | "room" | "alert";

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onChangeTab: (tab: SettingsTab) => void;
}

const TABS: { key: SettingsTab; label: string }[] = [
  { key: "elderly", label: "어르신 관리" },
  { key: "room", label: "방, 장치 관리" },
  { key: "alert", label: "알림 설정" },
];

export default function SettingsTabs({
  activeTab,
  onChangeTab,
}: SettingsTabsProps) {
  return (
    <S.TabBar>
      {TABS.map((tab) => (
        <S.TabButton
          key={tab.key}
          type="button"
          $active={activeTab === tab.key}
          onClick={() => onChangeTab(tab.key)}
        >
          {tab.label}
        </S.TabButton>
      ))}
    </S.TabBar>
  );
}
