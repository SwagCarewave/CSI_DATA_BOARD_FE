// src/components/NightMovement/ActivityEventCard.tsx

import * as S from "../../styles/NightMovement/ActivityRecords";
import { Icon } from "../../styles/NightMovement/tokens";
import type { ActivityEvent } from "../../data/nightMovement";
import { eventStatusLabel, eventTimeRange } from "../../utils/nightMovementFormat";

import runnerPending from "../../assets/NightMovement/runnerPending.svg";
import runnerCompleted from "../../assets/NightMovement/runnerCompleted.svg";
import runnerFalse from "../../assets/NightMovement/runnerFalse.svg";
import chevronRed from "../../assets/NightMovement/chevronRightRed.svg";
import chevronBlue from "../../assets/NightMovement/chevronRightBlue.svg";

interface ActivityEventCardProps {
  event: ActivityEvent;
  onSelect: (event: ActivityEvent) => void;
}

export default function ActivityEventCard({ event, onSelect }: ActivityEventCardProps) {
  const { status } = event;
  const runner = status === "pending" ? runnerPending : status === "false" ? runnerFalse : runnerCompleted;

  return (
    <S.EventCard type="button" $status={status} onClick={() => onSelect(event)}>
      <S.EventIcon $status={status}>
        <Icon src={runner} alt="" width={28} height={28} />
      </S.EventIcon>
      <S.EventContent>
        <S.EventTitle $status={status}>
          {status === "false" ? "활동 감지 기록" : "지속 활동 감지"}
        </S.EventTitle>
        <S.EventTime>{eventTimeRange(event)}</S.EventTime>
        <S.EventStatusText $status={status} $inline aria-hidden="true">
          {eventStatusLabel[status]}
        </S.EventStatusText>
      </S.EventContent>
      <S.EventStatusText $status={status}>{eventStatusLabel[status]}</S.EventStatusText>
      <Icon src={status === "pending" ? chevronRed : chevronBlue} alt="" width={12} height={16} />
    </S.EventCard>
  );
}
