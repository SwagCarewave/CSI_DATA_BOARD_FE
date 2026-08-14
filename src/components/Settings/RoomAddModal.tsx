import { useEffect, useState } from "react";

import type { Room } from "../../data/roomList";
import ComboBoxField from "./ComboBoxField";

import * as S from "../../styles/Settings/ElderlyAddModal";

interface RoomAddModalProps {
  roomNumbers: string[];
  onAddRoomNumber: (value: string) => void;
  onCancel: () => void;
  onSave: (data: Omit<Room, "id" | "status">) => void;
}

export default function RoomAddModal({
  roomNumbers,
  onAddRoomNumber,
  onCancel,
  onSave,
}: RoomAddModalProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [deviceCount, setDeviceCount] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isValid =
    roomNumber.trim().length > 0 &&
    deviceCount.trim().length > 0 &&
    Number(deviceCount) > 0;

  const handleSave = () => {
    if (!isValid) return;

    onSave({
      roomNumber: roomNumber.trim(),
      deviceCount: Number(deviceCount),
    });
  };

  return (
    <S.Overlay onClick={onCancel}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
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
        </S.Field>

        <S.Field>
          <S.Label>ESP32 장치 대수</S.Label>
          <S.AgeInputWrapper>
            <S.Input
              type="number"
              min={1}
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
