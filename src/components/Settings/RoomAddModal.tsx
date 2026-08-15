import { useEffect, useState } from "react";

import type { Room } from "../../data/roomList";
import ComboBoxField from "./ComboBoxField";
import { useModalFocusTrap } from "./useModalFocusTrap";

import * as S from "../../styles/Settings/ElderlyAddModal";

interface RoomAddModalProps {
  roomNumbers: string[];
  existingRoomNumbers: string[];
  onAddRoomNumber: (value: string) => void;
  onCancel: () => void;
  onSave: (data: Omit<Room, "id" | "status">) => void;
}

export default function RoomAddModal({
  roomNumbers,
  existingRoomNumbers,
  onAddRoomNumber,
  onCancel,
  onSave,
}: RoomAddModalProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [deviceCount, setDeviceCount] = useState("");

  const modalRef = useModalFocusTrap<HTMLDivElement>();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const trimmedRoomNumber = roomNumber.trim();
  const isDuplicateRoom = existingRoomNumbers.includes(trimmedRoomNumber);
  const deviceCountNumber = Number(deviceCount);

  const isValid =
    trimmedRoomNumber.length > 0 &&
    !isDuplicateRoom &&
    deviceCount.trim().length > 0 &&
    Number.isInteger(deviceCountNumber) &&
    deviceCountNumber > 0;

  const handleSave = () => {
    if (!isValid) return;

    onSave({
      roomNumber: trimmedRoomNumber,
      deviceCount: deviceCountNumber,
    });
  };

  return (
    <S.Overlay onClick={onCancel}>
      <S.ModalBox
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="방 추가"
        onClick={(e) => e.stopPropagation()}
      >
        <S.Title>방 추가</S.Title>

        <S.Field>
          <S.Label>방 번호</S.Label>
          <ComboBoxField
            value={roomNumber}
            options={roomNumbers}
            placeholder="방 번호 입력"
            ariaLabel="방 번호 입력"
            onChange={setRoomNumber}
            onAddOption={onAddRoomNumber}
          />
          {isDuplicateRoom && (
            <S.ErrorText>이미 등록된 방 번호입니다.</S.ErrorText>
          )}
        </S.Field>

        <S.Field>
          <S.Label>ESP32 장치 대수</S.Label>
          <S.AgeInputWrapper>
            <S.Input
              type="number"
              min={1}
              step={1}
              placeholder="장치 대수 입력"
              aria-label="ESP32 장치 대수 입력"
              value={deviceCount}
              onChange={(e) => setDeviceCount(e.target.value)}
            />
            <span>대</span>
          </S.AgeInputWrapper>
        </S.Field>

        <S.ButtonRow>
          <S.CancelButton type="button" onClick={onCancel}>
            취소
          </S.CancelButton>

          <S.SaveButton type="button" disabled={!isValid} onClick={handleSave}>
            저장
          </S.SaveButton>
        </S.ButtonRow>
      </S.ModalBox>
    </S.Overlay>
  );
}
