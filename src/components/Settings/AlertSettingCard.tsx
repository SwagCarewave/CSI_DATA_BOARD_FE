import { useState } from "react";

import NotificationConfirmModal from "./NotificationConfirmModal";
import FallAlertModal from "../FallAlertModal";
import { BellIcon, PulseIcon, ClockIcon, SendIcon, PersonIcon } from "./icons";

import * as S from "../../styles/Settings/AlertSettingCard";

type Sensitivity = "낮음" | "중간" | "높음";

const SENSITIVITY_OPTIONS: Sensitivity[] = ["낮음", "중간", "높음"];

const EMERGENCY_CONTACT = {
  name: "김케어 요양보호사",
  phone: "010-1234-5678",
};

export default function AlertSettingCard() {
  const [browserNotification, setBrowserNotification] = useState(true);
  const [sensitivity, setSensitivity] = useState<Sensitivity>("중간");
  const [thresholdMinutes, setThresholdMinutes] = useState(30);
  const [showEnableConfirm, setShowEnableConfirm] = useState(false);
  const [isFallAlertOpen, setIsFallAlertOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const fireTestNotification = () => {
    if (typeof Notification === "undefined") return;

    const send = () => {
      new Notification("[테스트] 낙상 감지 알림", {
        body: "더미 낙상 이벤트: 101호에서 낙상이 감지되었습니다.",
      });
    };

    if (Notification.permission === "granted") {
      send();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") send();
      });
    }
  };

  const runFallAlertTest = () => {
    fireTestNotification();
    setIsFallAlertOpen(true);
  };

  const handleTestClick = () => {
    if (browserNotification) {
      runFallAlertTest();
      return;
    }

    setShowEnableConfirm(true);
  };

  const handleEnableConfirm = () => {
    setBrowserNotification(true);
    setShowEnableConfirm(false);
    runFallAlertTest();
  };

  const handleSave = () => {
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <S.Card>
      <S.CardTitle>알림 설정</S.CardTitle>

      <S.Row>
        <S.RowLabelGroup>
          <S.RowIcon>
            <BellIcon />
          </S.RowIcon>
          <S.RowLabel>브라우저 알림</S.RowLabel>
        </S.RowLabelGroup>

        <S.ToggleSwitch
          type="button"
          $on={browserNotification}
          aria-label="브라우저 알림 토글"
          onClick={() => setBrowserNotification((prev) => !prev)}
        />

        <S.RowDescription>낙상 감지 시 브라우저 알림을 받습니다.</S.RowDescription>
      </S.Row>

      <S.Row>
        <S.RowLabelGroup>
          <S.RowIcon>
            <PulseIcon />
          </S.RowIcon>
          <S.RowLabel>낙상 감지 민감도</S.RowLabel>
        </S.RowLabelGroup>

        <S.SegmentGroup>
          {SENSITIVITY_OPTIONS.map((option) => (
            <S.SegmentButton
              key={option}
              type="button"
              $active={sensitivity === option}
              onClick={() => setSensitivity(option)}
            >
              {option}
            </S.SegmentButton>
          ))}
        </S.SegmentGroup>

        <S.RowDescription>낮을수록 오탐 증가, 높을수록 미탐 증가</S.RowDescription>
      </S.Row>

      <S.Row>
        <S.RowLabelGroup>
          <S.RowIcon>
            <ClockIcon />
          </S.RowIcon>
          <S.RowLabel>장시간 무반응 기준 시간</S.RowLabel>
        </S.RowLabelGroup>

        <S.StepperBox>
          <S.StepperInput
            type="number"
            min={1}
            aria-label="장시간 무반응 기준 시간 입력"
            value={thresholdMinutes}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isNaN(next)) return;
              setThresholdMinutes(next);
            }}
            onBlur={() =>
              setThresholdMinutes((prev) => Math.max(1, Math.round(prev)))
            }
          />
          <S.StepperArrows>
            <S.StepperArrowButton
              type="button"
              aria-label="기준 시간 증가"
              onClick={() => setThresholdMinutes((prev) => prev + 1)}
            >
              ▲
            </S.StepperArrowButton>
            <S.StepperArrowButton
              type="button"
              aria-label="기준 시간 감소"
              onClick={() =>
                setThresholdMinutes((prev) => Math.max(1, prev - 1))
              }
            >
              ▼
            </S.StepperArrowButton>
          </S.StepperArrows>
          <S.UnitBox>분</S.UnitBox>
        </S.StepperBox>

        <S.RowDescription>움직임·호흡 미감지 시 경고가 발생하는 시간</S.RowDescription>
      </S.Row>

      <S.Row>
        <S.RowLabelGroup>
          <S.RowIcon>
            <SendIcon />
          </S.RowIcon>
          <S.RowLabel>알림 테스트</S.RowLabel>
        </S.RowLabelGroup>

        <S.TestButton type="button" onClick={handleTestClick}>
          테스트 알림 발송
        </S.TestButton>

        <S.RowDescription>더미 낙상 이벤트로 알림 흐름을 확인합니다.</S.RowDescription>
      </S.Row>

      <S.Row>
        <S.RowLabelGroup>
          <S.RowIcon>
            <PersonIcon />
          </S.RowIcon>
          <S.RowLabel>긴급 연락처</S.RowLabel>
        </S.RowLabelGroup>

        <S.ContactRow>
          <S.ContactBox>{EMERGENCY_CONTACT.name}</S.ContactBox>
          <S.ContactBox>{EMERGENCY_CONTACT.phone}</S.ContactBox>
        </S.ContactRow>

        <S.RowDescription>대시보드 내 표시 용도</S.RowDescription>
      </S.Row>

      <S.SaveRow>
        <S.SaveButton type="button" onClick={handleSave}>
          저장
        </S.SaveButton>
      </S.SaveRow>

      {savedMessage && <S.SavedMessage>저장되었습니다.</S.SavedMessage>}

      {showEnableConfirm && (
        <NotificationConfirmModal
          onCancel={() => setShowEnableConfirm(false)}
          onConfirm={handleEnableConfirm}
        />
      )}

      <FallAlertModal
        isOpen={isFallAlertOpen}
        onClose={() => setIsFallAlertOpen(false)}
      />
    </S.Card>
  );
}
