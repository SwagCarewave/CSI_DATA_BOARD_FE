// src/components/NightMovement/EventModals.tsx

import { useState } from "react";

import * as S from "../../styles/NightMovement/Modal";
import { Button, cw, Icon } from "../../styles/NightMovement/tokens";
import { confirmResultOptions } from "../../data/nightMovement";
import type { ActivityEvent, ConfirmResult } from "../../data/nightMovement";
import Modal from "./Modal";
import ActivityEventCard from "./ActivityEventCard";

import radioOnIcon from "../../assets/NightMovement/radioOn.svg";
import radioOffIcon from "../../assets/NightMovement/radioOff.svg";
import checkCircleIcon from "../../assets/NightMovement/checkCircle.svg";

const eventMeta = (event: ActivityEvent) =>
  `${event.dateLabel} ${event.start.slice(0, 5)} · 지속시간 ${event.durationSec}초 · `;

/* 활동 사건 상세 */
interface EventDetailModalProps {
  event: ActivityEvent;
  onClose: () => void;
  onSelectResult: () => void;
}

export function EventDetailModal({ event, onClose, onSelectResult }: EventDetailModalProps) {
  if (event.status === "pending") {
    return (
      <Modal title="활동 사건 상세" onClose={onClose} paddingBottom={26}>
        <S.Text $mt={25} $tone="navy" $bold>
          {eventMeta(event)}
          <S.Strong $color={cw.red}>보호자 확인 대기</S.Strong>
        </S.Text>
        <S.Text $mt={21}>취침 모드 중 움직임이 이어졌습니다.</S.Text>
        <S.Text $mt={7}>현장을 확인해 주세요.</S.Text>
        <S.Footer $mt={31}>
          <Button type="button" $width={150} onClick={onSelectResult}>
            결과 선택
          </Button>
        </S.Footer>
      </Modal>
    );
  }

  return (
    <Modal title="활동 사건 상세" onClose={onClose} paddingBottom={36}>
      <S.Text $mt={28} $tone="navy" $bold>
        {eventMeta(event)}확인 완료
      </S.Text>
      <S.Text $mt={32}>지속 활동이 감지되어 생성된 사건입니다.</S.Text>
      <S.Text $mt={8}>
        {event.status === "normal" && (
          <>
            보호자가 <S.Strong $color={cw.success}>정상 활동</S.Strong>으로 확인하고 상황을
            종료했습니다.
          </>
        )}
        {event.status === "help" && (
          <>
            <S.Strong $color={cw.red}>도움이 필요한 활동</S.Strong>으로 확인하고 상황을 종료했습니다.
          </>
        )}
        {event.status === "false" && (
          <>
            <S.Strong $color={cw.navy}>잘못된 감지</S.Strong>로 확인하고 상황을 종료했습니다.
          </>
        )}
      </S.Text>
      <S.Footer $mt={51}>
        <Button type="button" $width={150} onClick={onClose}>
          확인
        </Button>
      </S.Footer>
    </Modal>
  );
}

/* 보호자 확인 결과 */
interface CaregiverResultModalProps {
  onClose: () => void;
  onSubmit: (result: ConfirmResult) => void;
}

export function CaregiverResultModal({ onClose, onSubmit }: CaregiverResultModalProps) {
  const [selected, setSelected] = useState<ConfirmResult | null>(null);

  return (
    <Modal title="보호자 확인 결과" onClose={onClose} paddingBottom={38}>
      <S.Text $mt={25}>현장에서 확인한 내용을 기록하세요.</S.Text>

      <S.RadioGroup $mt={22} role="radiogroup" aria-label="보호자 확인 결과">
        {confirmResultOptions.map((option) => {
          const isSelected = selected === option.value;
          return (
            <S.RadioChoice key={option.value} $selected={isSelected}>
              <input
                type="radio"
                name="caregiver-result"
                value={option.value}
                checked={isSelected}
                onChange={() => setSelected(option.value)}
              />
              <Icon src={isSelected ? radioOnIcon : radioOffIcon} alt="" width={20} height={20} />
              {option.label}
            </S.RadioChoice>
          );
        })}
      </S.RadioGroup>

      <S.Footer $mt={60}>
        <S.SubmitButton
          type="button"
          $width={150}
          disabled={selected === null}
          onClick={() => selected && onSubmit(selected)}
        >
          기록 완료
        </S.SubmitButton>
      </S.Footer>
    </Modal>
  );
}

/* 상황 종료 기록 완료 */
export function SavedModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="상황 종료 기록 완료" onClose={onClose} paddingBottom={23}>
      <S.SuccessBadge $mt={30}>
        <Icon src={checkCircleIcon} alt="" width={20} height={20} />
        확인 완료
      </S.SuccessBadge>
      <S.Text $mt={20}>보호자의 확인 결과를 움직임 기록에 저장했습니다.</S.Text>
      <S.Footer $mt={78}>
        <Button type="button" $width={150} onClick={onClose}>
          확인
        </Button>
      </S.Footer>
    </Modal>
  );
}

/* 전체 활동 기록 */
export type RecordTab = "all" | "pending" | "done";

interface AllRecordsModalProps {
  events: ActivityEvent[];
  initialTab: RecordTab;
  onClose: () => void;
  onSelectEvent: (event: ActivityEvent) => void;
}

export function AllRecordsModal({ events, initialTab, onClose, onSelectEvent }: AllRecordsModalProps) {
  const [tab, setTab] = useState<RecordTab>(initialTab);

  const pendingEvents = events.filter((event) => event.status === "pending");
  const doneEvents = events.filter((event) => event.status !== "pending");
  const visible = tab === "pending" ? pendingEvents : tab === "done" ? doneEvents : events;

  const tabs: { value: RecordTab; label: string }[] = [
    { value: "all", label: `전체 ${events.length}` },
    { value: "pending", label: `미확인 ${pendingEvents.length}` },
    { value: "done", label: `확인 완료 ${doneEvents.length}` },
  ];

  return (
    <Modal title="전체 활동 기록" onClose={onClose} paddingTop={23} paddingBottom={19} radius={16} largeTitle>
      <S.Description>이번 관찰에서 감지된 활동을 확인하고 보호자 확인 결과를 관리합니다.</S.Description>

      <S.Tabs role="tablist" aria-label="기록 필터">
        {tabs.map((item) => (
          <Button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={tab === item.value}
            $height={36}
            $variant={tab === item.value ? "selected" : "secondary"}
            onClick={() => setTab(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </S.Tabs>

      <S.Rule />

      <S.RecordList>
        {visible.length === 0 && <S.RecordEmpty>해당하는 기록이 없습니다.</S.RecordEmpty>}
        {visible.map((event) => (
          <li key={event.id}>
            <ActivityEventCard event={event} onSelect={onSelectEvent} />
          </li>
        ))}
      </S.RecordList>

      <S.RecordFooter>
        <span>{visible.length}개 기록</span>
        <span>기록을 누르면 상세 내용을 볼 수 있습니다.</span>
      </S.RecordFooter>
    </Modal>
  );
}
