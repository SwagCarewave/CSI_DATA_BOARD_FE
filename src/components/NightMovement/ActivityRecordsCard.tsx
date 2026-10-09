// src/components/NightMovement/ActivityRecordsCard.tsx

import * as S from "../../styles/NightMovement/ActivityRecords";
import { Button, CardTitle, Icon } from "../../styles/NightMovement/tokens";
import type { ActivityEvent } from "../../data/nightMovement";
import ActivityEventCard from "./ActivityEventCard";

import chevronRight from "../../assets/NightMovement/chevronRight.svg";

interface ActivityRecordsCardProps {
  // null이면 업로드 전 빈 상태
  events: ActivityEvent[] | null;
  compact?: boolean;
  onViewAll: () => void;
  onViewUnconfirmed: () => void;
  onSelectEvent: (event: ActivityEvent) => void;
}

export default function ActivityRecordsCard({
  events,
  compact = false,
  onViewAll,
  onViewUnconfirmed,
  onSelectEvent,
}: ActivityRecordsCardProps) {
  const unconfirmedCount = events?.filter((event) => event.status === "pending").length ?? 0;

  return (
    <S.RecordsCard aria-label="감지된 움직임 기록">
      <S.RecordsHeader>
        <CardTitle>감지된 움직임 기록</CardTitle>
        {events ? (
          <S.ViewAllButton type="button" onClick={onViewAll}>
            전체 기록 보기
            <Icon src={chevronRight} alt="" width={12} height={16} />
          </S.ViewAllButton>
        ) : (
          <Button type="button" $variant="disabled" $width={116} disabled>
            전체 기록 보기
          </Button>
        )}
      </S.RecordsHeader>

      {events ? (
        <>
          <S.Unconfirmed
            type="button"
            $compact={compact}
            $empty={unconfirmedCount === 0}
            disabled={unconfirmedCount === 0}
            onClick={onViewUnconfirmed}
          >
            미확인 {unconfirmedCount}건
          </S.Unconfirmed>
          <S.EventList $mt={compact ? 20 : 15}>
            {events.map((event) => (
              <li key={event.id}>
                <ActivityEventCard event={event} onSelect={onSelectEvent} />
              </li>
            ))}
          </S.EventList>
        </>
      ) : (
        <>
          <S.Unconfirmed type="button" $compact $empty disabled>
            미확인 —
          </S.Unconfirmed>
          <S.EmptyText>업로드한 파일의 활동 기록이 표시됩니다.</S.EmptyText>
        </>
      )}
    </S.RecordsCard>
  );
}
