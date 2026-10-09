// src/components/NightMovement/RealtimeControlBar.tsx

import * as S from "../../styles/NightMovement/RealtimeControlBar";
import { Icon } from "../../styles/NightMovement/tokens";
import type { Receiver } from "../../data/nightMovement";
import ReceiverStatusBadge from "./ReceiverStatusBadge";

import switchOnIcon from "../../assets/NightMovement/switchOn.svg";
import switchOffIcon from "../../assets/NightMovement/switchOff.svg";

interface RealtimeControlBarProps {
  sleepMode: boolean;
  onSleepModeChange: (next: boolean) => void;
  observationStart: string;
  receivers: Receiver[];
  lastSignal: string;
}

export default function RealtimeControlBar({
  sleepMode,
  onSleepModeChange,
  observationStart,
  receivers,
  lastSignal,
}: RealtimeControlBarProps) {
  return (
    <S.Bar aria-label="실시간 제어">
      <S.Segment $width={111} $gap={6}>
        <S.Label id="sleep-mode-label">취침 모드</S.Label>
        <S.Switch
          type="button"
          role="switch"
          aria-checked={sleepMode}
          aria-labelledby="sleep-mode-label"
          onClick={() => onSleepModeChange(!sleepMode)}
        >
          <Icon src={sleepMode ? switchOnIcon : switchOffIcon} alt="" width={60} height={28} />
        </S.Switch>
      </S.Segment>

      <S.Divider />

      <S.Segment $width={166} $pl={53} $gap={5}>
        <S.Label>관찰 시작</S.Label>
        <S.Value>{sleepMode ? observationStart : "—"}</S.Value>
      </S.Segment>

      <S.Divider />

      <S.Segment $width={409} $pl={29} $gap={7} $wide>
        <S.Label $small>장치 연결 상태</S.Label>
        <S.Receivers>
          {receivers.map((receiver) => (
            <ReceiverStatusBadge key={receiver.device} {...receiver} />
          ))}
        </S.Receivers>
      </S.Segment>

      <S.Divider />

      <S.Segment $pl={29} $gap={5}>
        <S.Label>마지막 신호 수신</S.Label>
        <S.SignalRow>
          <S.Value>{lastSignal}</S.Value>
          <S.SignalCaption>신호 수신 중</S.SignalCaption>
        </S.SignalRow>
      </S.Segment>
    </S.Bar>
  );
}
