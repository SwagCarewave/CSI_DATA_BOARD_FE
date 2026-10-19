// src/components/ChristmasGame/LobbyScreen.tsx

// 게임 시작 로비: 대시보드로 돌아가기 · 제목 · 게임 방법 · ESP 연결 상태 오너먼트 · 썰매 · 게임 시작

import styled from "styled-components";

import type { EspLevel } from "../../hooks/useEspFeed";
import { ImageButton, Picture, at } from "../../styles/ChristmasGame/common";
import { images, ornamentImages } from "./assets";

const LEVELS: EspLevel[] = ["green", "orange", "red"];
const LEVEL_TEXT: Record<EspLevel, string> = {
  green: "ESP 수신기 3개가 모두 안정적으로 연결되었습니다.",
  orange: "ESP 연결 준비 중입니다. 수신기 일부가 연결되지 않았습니다.",
  red: "ESP가 연결되지 않았거나 불안정합니다.",
};
// 오너먼트 시트(502px)의 각 구슬 왼쪽 위치를 피그마 크기(172px)로 줄인 값
const ORNAMENT_X = [878, 932, 986];

interface LobbyScreenProps {
  espLevel: EspLevel;
  sourceNote?: string; // CSV 시연일 때 어떤 파일을 재생하는지
  onBackToDashboard: () => void;
  onHowTo: () => void;
  onStart: () => void;
}

export default function LobbyScreen({ espLevel, sourceNote, onBackToDashboard, onHowTo, onStart }: LobbyScreenProps) {
  const ready = espLevel === "green";

  return (
    <>
      <Picture src={images.lobbyBackground} alt="" style={at(0, 0, 1215, 820)} />
      <Picture src={images.sleigh} alt="" style={at(64, 150, 639, 410)} />
      <Picture src={images.titleLogo} alt="ESP로 선물 전달 대작전" style={at(675, 60, 466, 262)} />

      <ImageButton type="button" style={at(33, 44, 140, 114)} onClick={onBackToDashboard} aria-label="대시보드로 돌아가기">
        <img src={images.backButton} alt="" />
      </ImageButton>

      <ImageButton type="button" style={at(840, 262, 225, 93)} onClick={onHowTo} aria-label="게임 방법">
        <img src={images.howToButton} alt="" />
      </ImageButton>

      <div role="status" aria-label={LEVEL_TEXT[espLevel]}>
        {LEVELS.map((level, i) => (
          <Picture
            key={level}
            src={level === espLevel ? ornamentImages[level].on : ornamentImages[level].off}
            alt=""
            style={at(ORNAMENT_X[i], 351, 45, 60)}
          />
        ))}
      </div>
      {sourceNote && <SourceNote style={at(720, 420, 470)}>{sourceNote}</SourceNote>}

      <ImageButton
        type="button"
        style={ready ? at(384, 691, 482, 132) : at(384, 695, 482, 124)}
        disabled={!ready}
        onClick={onStart}
        aria-label={ready ? "게임 시작" : "게임 시작 (ESP 연결이 모두 초록색이 되면 시작할 수 있어요)"}
      >
        <img src={ready ? images.startButton : images.startButtonDisabled} alt="" />
      </ImageButton>
    </>
  );
}

const SourceNote = styled.p`
  position: absolute;

  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  word-break: keep-all;
  -webkit-text-stroke: 3px #5a1020;
  paint-order: stroke fill;
`;
