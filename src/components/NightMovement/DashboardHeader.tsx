// src/components/NightMovement/DashboardHeader.tsx

import { Link } from "react-router-dom";

import * as S from "../../styles/NightMovement/NightMovementDashboardPage";
import { Button } from "../../styles/NightMovement/tokens";

export type DashboardMode = "realtime" | "csv";

interface DashboardHeaderProps {
  mode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
  skeletonView: boolean;
  onSkeletonViewChange: (next: boolean) => void;
}

export default function DashboardHeader({ mode, onModeChange, skeletonView, onSkeletonViewChange }: DashboardHeaderProps) {
  return (
    <S.Header>
      <S.Brand>CareWave</S.Brand>
      <S.BoardTitle>낙상 감지 대시보드</S.BoardTitle>

      <S.ModeTabs aria-label="화면 선택">
        <Button
          type="button"
          $variant={skeletonView ? "primary" : "secondary"}
          aria-pressed={skeletonView}
          onClick={() => onSkeletonViewChange(!skeletonView)}
        >
          스켈레톤 버전
        </Button>
        <S.GameLink as={Link} to="/game" $variant="secondary">
          esp 게임 바로가기
        </S.GameLink>
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
