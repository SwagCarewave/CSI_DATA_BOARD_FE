// src/components/NightMovement/WifiHeatmapCard.tsx

import type { ReactNode } from "react";

import * as S from "../../styles/NightMovement/ChartCards";
import { CardSubtitle, CardTitle } from "../../styles/NightMovement/tokens";

// Figma: 제목 top 11 + 29, 설명 top 41 + 20 → 헤더 높이 61
const HEADER_HEIGHT = 61;

interface WifiHeatmapCardProps {
  subtitle: string;
  // 히트맵 (없으면 업로드 전 빈 상태)
  chart?: ReactNode;
  emptyText?: string;
}

export default function WifiHeatmapCard({ subtitle, chart, emptyText = "CSI 히트맵 영역" }: WifiHeatmapCardProps) {
  return (
    <S.ChartCard $emphasis $minHeight={207} aria-label="시간별 Wi-Fi 신호 변화">
      <S.ChartHeader $pt={11}>
        <CardTitle>시간별 Wi-Fi 신호 변화</CardTitle>
        <S.Subtitle $mt={1}>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </S.Subtitle>
      </S.ChartHeader>

      {chart ? (
        <S.ChartBody $mt={4} $mobileMt={10} $scrollMinWidth={720}>
          <S.ChartSlot>{chart}</S.ChartSlot>
        </S.ChartBody>
      ) : (
        <S.ChartBody $mt={73 - HEADER_HEIGHT} $mobileMt={12} $scrollMinWidth={0}>
          <S.Placeholder $ml={95} $mr={26} $height={118}>
            <S.PlaceholderText $left={41.3} $top={37.3}>
              {emptyText}
            </S.PlaceholderText>
          </S.Placeholder>
        </S.ChartBody>
      )}
    </S.ChartCard>
  );
}
