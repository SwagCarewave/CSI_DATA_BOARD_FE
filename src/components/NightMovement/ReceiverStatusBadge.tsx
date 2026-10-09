// src/components/NightMovement/ReceiverStatusBadge.tsx

import * as S from "../../styles/NightMovement/RealtimeControlBar";
import { cw, Icon } from "../../styles/NightMovement/tokens";
import type { Receiver, ReceiverState } from "../../data/nightMovement";

import dotNormal from "../../assets/NightMovement/dotNormal.svg";
import dotWeak from "../../assets/NightMovement/dotWeak.svg";
import dotDisconnected from "../../assets/NightMovement/dotDisconnected.svg";
import dotNotConnected from "../../assets/NightMovement/dotNotConnected.svg";

const stateStyle: Record<ReceiverState, { label: string; bg: string; color: string; dot: string }> = {
  normal: { label: "정상", bg: cw.successBg, color: cw.success, dot: dotNormal },
  weak: { label: "신호 부족", bg: cw.amberBg, color: cw.amber, dot: dotWeak },
  disconnected: { label: "연결 끊김", bg: cw.pink, color: cw.red, dot: dotDisconnected },
  notConnected: { label: "미연결", bg: cw.pale, color: cw.muted, dot: dotNotConnected },
};

export default function ReceiverStatusBadge({ device, state }: Receiver) {
  const style = stateStyle[state];

  return (
    <S.ReceiverBadge $bg={style.bg}>
      <Icon src={style.dot} alt="" width={6} height={6} />
      <S.ReceiverName>{device}</S.ReceiverName>
      <S.ReceiverState $color={style.color}>{style.label}</S.ReceiverState>
    </S.ReceiverBadge>
  );
}
