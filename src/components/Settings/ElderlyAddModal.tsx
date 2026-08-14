import { useEffect, useState } from "react";

import type { Elderly } from "../../data/elderlyList";
import ComboBoxField from "./ComboBoxField";

import * as S from "../../styles/Settings/ElderlyAddModal";

interface ElderlyAddModalProps {
  editingElderly: Elderly | null;
  roomNumbers: string[];
  caregivers: string[];
  onAddRoomNumber: (value: string) => void;
  onAddCaregiver: (value: string) => void;
  onCancel: () => void;
  onSave: (data: Omit<Elderly, "id">) => void;
}

export default function ElderlyAddModal({
  editingElderly,
  roomNumbers,
  caregivers,
  onAddRoomNumber,
  onAddCaregiver,
  onCancel,
  onSave,
}: ElderlyAddModalProps) {
  const [name, setName] = useState(editingElderly?.name ?? "");
  const [age, setAge] = useState(
    editingElderly ? String(editingElderly.age) : ""
  );
  const [roomNumber, setRoomNumber] = useState(editingElderly?.roomNumber ?? "");
  const [caregiver, setCaregiver] = useState(editingElderly?.caregiver ?? "");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isValid =
    name.trim().length > 0 &&
    age.trim().length > 0 &&
    Number(age) > 0 &&
    roomNumber.trim().length > 0 &&
    caregiver.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;

    onSave({
      name: name.trim(),
      age: Number(age),
      roomNumber: roomNumber.trim(),
      caregiver: caregiver.trim(),
    });
  };

  return (
    <S.Overlay onClick={onCancel}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.Title>{editingElderly ? "어르신 정보 수정" : "어르신 추가"}</S.Title>

        <S.Field>
          <S.Label>이름</S.Label>
          <S.Input
            placeholder="어르신 이름 입력"
            aria-label="어르신 이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>나이</S.Label>
          <S.AgeInputWrapper>
            <S.Input
              type="number"
              min={0}
              placeholder="나이 입력"
              aria-label="나이 입력"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <span>세</span>
          </S.AgeInputWrapper>
        </S.Field>

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
          <S.Label>담당 요양보호사</S.Label>
          <ComboBoxField
            value={caregiver}
            options={caregivers}
            placeholder="담당 요양보호사 입력"
            ariaLabel="담당 요양보호사 입력"
            onChange={setCaregiver}
            onAddOption={onAddCaregiver}
          />
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
