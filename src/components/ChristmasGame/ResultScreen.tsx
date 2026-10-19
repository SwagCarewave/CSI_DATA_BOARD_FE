// src/components/ChristmasGame/ResultScreen.tsx

// 결과 화면: 기록 시간 + 이름 입력 → 이름이 있으면 저장 버튼이 켜지고, 누르면 바로 서버에 저장(API 26)

import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";

import { errorMessage } from "../../api/client";
import type { MazeRecord } from "../../api/types";
import { ImageButton, Picture, Text, at, gameColors } from "../../styles/ChristmasGame/common";
import { images } from "./assets";
import { formatGameTime } from "./mazeGame";
import { saveRecord } from "./rankings";

const NAME_MAX = 10; // 서버는 20자까지 받지만, 입력 칸 너비에 맞춰 10자로 제한

interface ResultScreenProps {
  timeMs: number;
  onSaved: (record: MazeRecord) => void;
}

export default function ResultScreen({ timeMs, onSaved }: ResultScreenProps) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trimmed = name.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!trimmed || saving) return;
    setSaving(true);
    setError(null);
    try {
      onSaved(await saveRecord(trimmed, timeMs));
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Cover src={images.resultBackground} alt="" style={at(0, 0, 1215, 820)} />
      <Picture src={images.resultRibbon} alt="" style={at(0, 0, 271, 336)} />
      <Picture src={images.resultBoard} alt="" style={at(354, 44, 509, 615)} />

      <Text $size={36} $color={gameColors.wine} style={{ ...at(354, 213, 509), textAlign: "center" }}>
        기록
      </Text>
      <Text $size={48} $color={gameColors.wine} style={{ ...at(354, 279, 509), textAlign: "center" }}>
        {formatGameTime(timeMs)}
      </Text>

      <NameInput
        type="text"
        value={name}
        maxLength={NAME_MAX}
        placeholder="이름을 입력하세요"
        aria-label="이름"
        autoFocus
        onChange={(e) => setName(e.target.value)}
        style={at(492, 382, 255, 40)}
      />
      <Underline style={at(492, 422, 255, 3)} />

      <ImageButton type="submit" style={at(427, 451, 376, 142)} disabled={!trimmed || saving} aria-label="기록 저장" aria-busy={saving}>
        <img src={images.saveButton} alt="" />
      </ImageButton>
      {error && (
        <ErrorText role="alert" style={at(354, 596, 509)}>
          {error}
        </ErrorText>
      )}

      <Picture src={images.resultGirl} alt="" style={at(6, 461, 486, 359)} />
      <Picture src={images.resultReindeer} alt="" style={at(760, 400, 470, 436)} />
    </form>
  );
}

const Cover = styled(Picture)`
  object-fit: cover;
`;

const NameInput = styled.input`
  position: absolute;
  padding: 0;
  border: none;
  background: transparent;

  color: ${gameColors.wine};
  font-family: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  &::placeholder {
    color: ${gameColors.wine};
    opacity: 0.85;
  }

  &:focus::placeholder {
    opacity: 0.4;
  }
`;

const ErrorText = styled.p`
  position: absolute;
  z-index: 1;

  color: ${gameColors.alert};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  white-space: normal;
  -webkit-text-stroke: 3px #ffffff;
  paint-order: stroke fill;
`;

const Underline = styled.div`
  position: absolute;
  background-color: ${gameColors.wine};
`;
