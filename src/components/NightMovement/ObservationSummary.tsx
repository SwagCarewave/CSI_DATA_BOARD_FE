// src/components/NightMovement/ObservationSummary.tsx

import * as S from "../../styles/NightMovement/ObservationSummary";
import { Icon } from "../../styles/NightMovement/tokens";

import clockIcon from "../../assets/NightMovement/clock.svg";
import documentIcon from "../../assets/NightMovement/document.svg";

interface ObservationSummaryProps {
  timeLabel: string;
  timeValue: string;
  timeExtra?: string;
  eventsLabel: string;
  eventsValue: string;
}

export default function ObservationSummary({
  timeLabel,
  timeValue,
  timeExtra,
  eventsLabel,
  eventsValue,
}: ObservationSummaryProps) {
  return (
    <S.Summary aria-label="관찰 요약">
      <S.Item>
        <S.IconBox>
          <Icon src={clockIcon} alt="" width={20.2} height={20.2} />
        </S.IconBox>
        <S.Label>{timeLabel}</S.Label>
        <S.Value>{timeValue}</S.Value>
        {timeExtra && <S.Extra>{timeExtra}</S.Extra>}
      </S.Item>

      <S.Divider />

      <S.Item>
        <S.IconBox>
          <Icon src={documentIcon} alt="" width={17.2} height={21.7} />
        </S.IconBox>
        <S.Label>{eventsLabel}</S.Label>
        <S.Value>{eventsValue}</S.Value>
      </S.Item>
    </S.Summary>
  );
}
