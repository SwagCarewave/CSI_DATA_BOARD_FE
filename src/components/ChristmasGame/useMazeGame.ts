// src/components/ChristmasGame/useMazeGame.ts

// 미로 게임 진행: 준비 → 시작 → 플레이(화살표 생성 · 2초마다 갈고리 · 한 칸 이동) → 도착

import { useEffect, useEffectEvent, useReducer } from "react";

import type { EspScore } from "../../hooks/useEspFeed";
import type { CaneArrow } from "./CandyCane";
import {
  ARROW_REPEAT_MS,
  CANE_SLOTS,
  GOAL_CELL,
  HOOK_INTERVAL_MS,
  START_CELL,
  directionFromScore,
  nextDirection,
} from "./mazeGame";
import type { Direction } from "./mazeGame";

const READY_MS = 1500; // "준비" 표시
const GO_MS = 1000; // "시작" 표시
const MOVE_MS = 900; // 한 칸 가는 시간 (그동안 달리기 GIF 반복)
const SCORE_CHECK_MS = 250;
const SCORE_STALE_MS = 2500; // 이보다 오래된 출력값으로는 화살표를 만들지 않는다
const FADE_MS = 500;

export type GamePhase = "ready" | "go" | "playing" | "arrived";

interface GameState {
  phase: GamePhase;
  arrows: CaneArrow[];
  nextId: number;
  lastDirection: Direction | null;
  lastPushAt: number;
  cell: number;
  facing: "front" | Direction;
  moving: Direction | null;
  moveCount: number;
  startedAt: number | null;
  finishedAt: number | null;
}

type Action =
  | { type: "go" }
  | { type: "play"; now: number }
  | { type: "arrow"; direction: Direction; now: number }
  | { type: "hook" }
  | { type: "moveDone" }
  | { type: "sweep" }
  | { type: "finish"; now: number };

const initialState: GameState = {
  phase: "ready",
  arrows: [],
  nextId: 1,
  lastDirection: null,
  lastPushAt: 0,
  cell: START_CELL,
  facing: "front",
  moving: null,
  moveCount: 0,
  startedAt: null,
  finishedAt: null,
};

const bodyOf = (arrows: CaneArrow[]) => arrows.filter((arrow) => typeof arrow.place === "object");

// 몸통은 오래된 것부터 위 칸에, 새것이 맨 아래 칸에 오도록 다시 배치
const layoutBody = (arrows: CaneArrow[]) => {
  const body = bodyOf(arrows);
  const offset = CANE_SLOTS - body.length;
  return arrows.map((arrow) =>
    typeof arrow.place === "object" ? { ...arrow, place: { slot: offset + body.indexOf(arrow) } } : arrow,
  );
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "go":
      return { ...state, phase: "go" };
    case "play":
      return { ...state, phase: "playing", startedAt: action.now };
    case "arrow": {
      if (state.phase !== "playing") return state;
      // 몸통이 가득 차 있으면 새 화살표를 만들지 않는다 → 들어간 화살표는 모두 갈고리까지 간다.
      // lastDirection을 그대로 두므로, 자리가 나면 그때의 방향으로 곧바로 하나 들어온다
      if (bodyOf(state.arrows).length >= CANE_SLOTS) return state;
      const arrows: CaneArrow[] = [...state.arrows, { id: state.nextId, direction: action.direction, place: { slot: CANE_SLOTS } }];
      return {
        ...state,
        arrows: layoutBody(arrows),
        nextId: state.nextId + 1,
        lastDirection: action.direction,
        lastPushAt: action.now,
      };
    }
    case "hook": {
      if (state.phase !== "playing") return state;
      const oldest = bodyOf(state.arrows)[0];
      if (!oldest) return state;
      const arrows = layoutBody(
        state.arrows.map((arrow) =>
          arrow === oldest ? { ...arrow, place: "hook" as const } : arrow.place === "hook" ? { ...arrow, place: "spent" as const } : arrow,
        ),
      );
      const direction = oldest.direction;
      // 정답 경로의 다음 방향과 같을 때만 한 칸 전진, 다르면 제자리
      if (state.moving || direction !== nextDirection(state.cell)) return { ...state, arrows };
      return { ...state, arrows, cell: state.cell + 1, facing: direction, moving: direction, moveCount: state.moveCount + 1 };
    }
    case "moveDone":
      return { ...state, moving: null };
    case "sweep":
      return { ...state, arrows: state.arrows.filter((arrow) => arrow.place !== "out" && arrow.place !== "spent") };
    case "finish":
      return state.phase === "playing" ? { ...state, phase: "arrived", finishedAt: action.now } : state;
  }
}

export function useMazeGame(score: EspScore | null) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const playing = state.phase === "playing";

  // 준비 → 시작 → 플레이
  useEffect(() => {
    const goTimer = window.setTimeout(() => dispatch({ type: "go" }), READY_MS);
    const playTimer = window.setTimeout(() => dispatch({ type: "play", now: Date.now() }), READY_MS + GO_MS);
    return () => {
      window.clearTimeout(goTimer);
      window.clearTimeout(playTimer);
    };
  }, []);

  // 출력값 → 화살표: 방향이 바뀌면 곧바로, 같은 방향이면 2초마다 하나 더
  const checkScore = useEffectEvent(() => {
    const now = Date.now();
    if (!score || now - score.ts > SCORE_STALE_MS) return;
    const direction = directionFromScore(score.value);
    if (direction !== state.lastDirection || now - state.lastPushAt >= ARROW_REPEAT_MS) {
      dispatch({ type: "arrow", direction, now });
    }
  });

  useEffect(() => {
    if (!playing) return;
    const scoreTimer = window.setInterval(checkScore, SCORE_CHECK_MS);
    const hookTimer = window.setInterval(() => dispatch({ type: "hook" }), HOOK_INTERVAL_MS);
    return () => {
      window.clearInterval(scoreTimer);
      window.clearInterval(hookTimer);
    };
  }, [playing]);

  // 밀려나거나 쓰인 화살표는 사라지는 모션 뒤에 지운다
  const hasLeaving = state.arrows.some((arrow) => arrow.place === "out" || arrow.place === "spent");
  useEffect(() => {
    if (!hasLeaving) return;
    const timer = window.setTimeout(() => dispatch({ type: "sweep" }), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [hasLeaving, state.nextId, state.moveCount]);

  // 한 칸 이동이 끝나면 멈춤 GIF로, 도착 칸이면 게임 끝
  useEffect(() => {
    if (state.moveCount === 0) return;
    const timer = window.setTimeout(() => {
      dispatch({ type: "moveDone" });
      if (state.cell === GOAL_CELL) dispatch({ type: "finish", now: Date.now() });
    }, MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [state.moveCount, state.cell]);

  // 화면에 띄울 현재 방향 (출력값이 없으면 null)
  const currentDirection = score ? directionFromScore(score.value) : null;

  return { ...state, currentDirection, moveMs: MOVE_MS };
}
