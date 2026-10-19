// src/components/ChristmasGame/GameScreen.tsx

// 본편 게임 (피그마 1215 × 1293): 미로 · 지팡이 사탕 큐 · 시간 · 모델 출력값 피커 · 준비/시작

import { useEffect, useEffectEvent, useSyncExternalStore } from "react";
import styled, { keyframes } from "styled-components";

import type { EspScore } from "../../hooks/useEspFeed";
import { Picture, Text, at, gameColors } from "../../styles/ChristmasGame/common";
import { images, santaIdle, santaRun } from "./assets";
import CandyCane from "./CandyCane";
import ModelPicker from "./ModelPicker";
import { PATH, formatGameTime } from "./mazeGame";
import { useMazeGame } from "./useMazeGame";

export const GAME_WIDTH = 1215;
export const GAME_HEIGHT = 1293;

const MAZE = { left: 110.5, top: 196, size: 1010 };
const SANTA_HEIGHT = 123;
const SANTA_FOOT = 23; // 칸 가운데에서 발끝까지
const RESULT_DELAY_MS = 1200; // 집에 도착한 모습을 잠깐 보여 준 뒤 결과 화면으로

// 시간 표시는 0.2초마다 다시 그린다
const subscribeClock = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 200);
  return () => window.clearInterval(timer);
};
const readClock = () => Math.floor(Date.now() / 200) * 200;

interface GameScreenProps {
  score: EspScore | null;
  onFinish: (elapsedMs: number) => void;
}

export default function GameScreen({ score, onFinish }: GameScreenProps) {
  const game = useMazeGame(score);
  const now = useSyncExternalStore(subscribeClock, readClock);
  const elapsed = game.startedAt === null ? 0 : (game.finishedAt ?? Math.max(now, game.startedAt)) - game.startedAt;

  const finish = useEffectEvent(() => onFinish(elapsed));
  useEffect(() => {
    if (game.phase !== "arrived") return;
    const timer = window.setTimeout(finish, RESULT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [game.phase]);

  const cell = PATH[game.cell];
  // 발 기준점(칸 가운데 아래)만 칸에서 칸으로 미끄러진다.
  // 모든 GIF는 발(부츠)이 그림 가로 정중앙에 있으므로 -50%로 칸 정중앙에 세운다 (옆을 볼 때 머리카락은 뒤로 뻗어 있음)
  const footX = MAZE.left + cell.x * MAZE.size;
  const footY = MAZE.top + cell.y * MAZE.size + SANTA_FOOT;
  const santaSrc = game.moving ? santaRun[game.moving] : santaIdle[game.facing];

  return (
    <>
      <Picture src={images.gameBackground} alt="" style={at(0, 0, GAME_WIDTH, GAME_HEIGHT)} />
      <Picture src={images.gameFrame} alt="" style={at(0, 0, GAME_WIDTH, GAME_HEIGHT)} />
      <Picture src={images.ribbonDeco} alt="" style={at(-5, 922, 269, 337)} />
      <Picture src={images.maze} alt="크리스마스 마을 미로" style={at(MAZE.left, MAZE.top, MAZE.size, MAZE.size)} />
      <Picture src={images.cottage} alt="도착지: 아이의 집" style={at(840, 22, 355, 296)} />

      <CandyCane left={-39} top={31} width={455} arrows={game.arrows} />

      <SantaAnchor style={{ transform: `translate(${footX}px, ${footY}px)`, transitionDuration: `${game.moveMs}ms` }}>
        <Santa src={santaSrc} alt="산타 캐릭터" style={{ height: SANTA_HEIGHT }} />
      </SantaAnchor>

      <ModelPicker left={674} top={834} width={524} value={score?.value ?? null} direction={game.currentDirection} />

      <Picture src={images.timerBoard} alt="" style={at(296, 31, 624, 255)} />
      <Text $size={48} $color={gameColors.wine} style={{ ...at(296, 144, 624), textAlign: "center" }} role="timer" aria-label="걸린 시간">
        {formatGameTime(elapsed)}
      </Text>

      {(game.phase === "ready" || game.phase === "go") && (
        <Overlay>
          <Sign key={game.phase} src={game.phase === "ready" ? images.readySign : images.startSign} alt={game.phase === "ready" ? "준비" : "시작"} />
        </Overlay>
      )}
    </>
  );
}

const SantaAnchor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 0;
  height: 0;
  transition-property: transform;
  transition-timing-function: linear;
`;

const Santa = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: auto;
  max-width: none;
  pointer-events: none;
  user-select: none;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(10, 6, 24, 0.55);
`;

const signIn = keyframes`
  from {
    opacity: 0;
    scale: 0.6;
  }
`;

const Sign = styled.img`
  width: 760px;
  height: auto;
  animation: ${signIn} 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
`;
