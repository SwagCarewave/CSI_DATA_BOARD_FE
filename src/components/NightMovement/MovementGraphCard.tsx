// src/components/NightMovement/MovementGraphCard.tsx

import type { ReactNode } from "react";

import * as S from "../../styles/NightMovement/ChartCards";
import { CardSubtitle, CardTitle } from "../../styles/NightMovement/tokens";

// Figma: 제목 top 10 + 29, 설명 top 42 + 20 → 헤더 높이 62, 그래프 영역 top 76
const HEADER_HEIGHT = 62;
const BODY_TOP = 76;

interface MovementGraphCardProps {
  subtitle: string;
  action?: ReactNode;
  // 그래프 (없으면 업로드 전 빈 상태)
  chart?: ReactNode;
  emptyText?: string;
  showGapNote?: boolean;
}

export default function MovementGraphCard({
  subtitle,
  action,
  chart,
  emptyText = "움직임 그래프 영역",
  showGapNote = false,
}: MovementGraphCardProps) {
  return (
    <S.ChartCard $emphasis $minHeight={340} aria-label="시간별 움직임 강도">
      <S.ChartHeader $pt={10}>
        <CardTitle>시간별 움직임 강도</CardTitle>
        <S.Subtitle $mt={3}>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </S.Subtitle>
        {action && <S.Action>{action}</S.Action>}
      </S.ChartHeader>

      {chart ? (
        <S.ChartBody $mt={BODY_TOP - HEADER_HEIGHT} $mobileMt={12} $scrollMinWidth={560}>
          <S.ChartSlot>{chart}</S.ChartSlot>
        </S.ChartBody>
      ) : (
        <S.ChartBody $mt={BODY_TOP - HEADER_HEIGHT} $mobileMt={12} $scrollMinWidth={0}>
          <S.Placeholder $ml={95} $mr={20} $height={170}>
            <S.PlaceholderText $left={34.7} $top={41.8}>
              {emptyText}
            </S.PlaceholderText>
          </S.Placeholder>
          <S.AxisLabel $top={68}>움직임 수준</S.AxisLabel>
          {showGapNote && (
            <S.Note $mt={17} $ml={95}>
              신호 공백은 빈 구간으로 표시합니다.
            </S.Note>
          )}
        </S.ChartBody>
      )}
    </S.ChartCard>
  );
}
