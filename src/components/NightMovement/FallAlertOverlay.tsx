// src/components/NightMovement/FallAlertOverlay.tsx

// 대시보드 낙상 경고 (Figma 387:573 "대시보드 경고창 수정")
// 행동 분류가 넘어짐이면 2초 동안 화면 전체에 띄운다. 뒤의 대시보드는 살짝 흐리게 그대로 보인다 (스켈레톤 윤곽이 보일 정도)

import { useEffect, useEffectEvent } from "react";

import * as S from "../../styles/NightMovement/FallAlertOverlay";

import borderImage from "../../assets/NightMovement/fallBorder.svg";
import warningIcon from "../../assets/NightMovement/fallWarning.svg";

const SHOW_MS = 2000;

export default function FallAlertOverlay({ onClose }: { onClose: () => void }) {
  const close = useEffectEvent(onClose);

  useEffect(() => {
    const timer = window.setTimeout(close, SHOW_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <S.Overlay role="alertdialog" aria-live="assertive" aria-label="낙상 감지" onClick={onClose}>
      <S.Border src={borderImage} alt="" $edge="top" />
      <S.Content>
        <img src={warningIcon} alt="" width={165} height={135} />
        <S.Message>낙상 감지</S.Message>
      </S.Content>
      <S.Border src={borderImage} alt="" $edge="bottom" />
    </S.Overlay>
  );
}
