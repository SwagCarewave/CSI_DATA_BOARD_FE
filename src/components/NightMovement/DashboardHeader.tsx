// src/components/NightMovement/DashboardHeader.tsx

import * as S from "../../styles/NightMovement/NightMovementDashboardPage";
import { Button } from "../../styles/NightMovement/tokens";

export type DashboardMode = "realtime" | "csv";

interface DashboardHeaderProps {
  mode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
}

export default function DashboardHeader({ mode, onModeChange }: DashboardHeaderProps) {
  return (
    <S.Header>
      <S.Brand>CareWave</S.Brand>
      <S.BoardTitle>야간 움직임 대시보드</S.BoardTitle>

      <S.ModeTabs aria-label="화면 선택">
        <Button
          type="button"
          $width={135}
          $variant={mode === "realtime" ? "primary" : "secondary"}
          aria-pressed={mode === "realtime"}
          onClick={() => onModeChange("realtime")}
        >
          실시간
        </Button>
        <Button
          type="button"
          $variant={mode === "csv" ? "primary" : "secondary"}
          aria-pressed={mode === "csv"}
          onClick={() => onModeChange("csv")}
        >
          CSV 기록 조회
        </Button>
      </S.ModeTabs>
    </S.Header>
  );
}
