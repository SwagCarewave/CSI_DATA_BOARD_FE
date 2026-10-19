// src/pages/ChristmasGamePage.tsx

// 크리스마스 미로 게임 "ESP로 선물 전달 대작전"
// 로비 → (게임 방법 1·2) → 게임(준비·시작) → 결과(이름 저장) → 랭킹
// /game            : ESP 실시간 (관찰 세션을 켜고 모델 출력값을 받음)
// /game?source=csv : 시연용. 서버에 올린 CSV의 모델 결과를 재생해 넣음 (&file=파일이름 으로 바꿀 수 있음)

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { gameScreenImages, preloadImages } from "../components/ChristmasGame/assets";
import GameScreen, { GAME_HEIGHT, GAME_WIDTH } from "../components/ChristmasGame/GameScreen";
import HowToScreen from "../components/ChristmasGame/HowToScreen";
import LobbyScreen from "../components/ChristmasGame/LobbyScreen";
import RankingScreen from "../components/ChristmasGame/RankingScreen";
import ResultScreen from "../components/ChristmasGame/ResultScreen";
import Stage from "../components/ChristmasGame/Stage";
import { useCsvReplayFeed } from "../hooks/useCsvReplayFeed";
import { useEspFeed } from "../hooks/useEspFeed";
import type { EspLevel, EspScore } from "../hooks/useEspFeed";
import { GameFonts } from "../styles/ChristmasGame/common";

const DEFAULT_CSV = "yena_bending_normal_01_csi_raw.csv";

type Screen = "lobby" | "howto1" | "howto2" | "game" | "result" | "ranking";

const SCREEN_LABEL: Record<Screen, string> = {
  lobby: "게임 시작 로비",
  howto1: "게임 방법 1",
  howto2: "게임 방법 2",
  game: "게임 화면",
  result: "결과 화면",
  ranking: "전체 랭킹",
};

export default function ChristmasGamePage() {
  const [params] = useSearchParams();
  return params.get("source") === "csv" ? <CsvGame file={params.get("file") || DEFAULT_CSV} /> : <EspGame />;
}

function EspGame() {
  const esp = useEspFeed();
  return <GameFlow level={esp.level} score={esp.score} />;
}

function CsvGame({ file }: { file: string }) {
  const feed = useCsvReplayFeed(file);
  return (
    <GameFlow
      level={feed.level}
      score={feed.score}
      sourceNote={feed.error ?? `시연 모드 · CSV 재생: ${file}`}
      onGameStart={feed.restart}
    />
  );
}

interface GameFlowProps {
  level: EspLevel;
  score: EspScore | null;
  sourceNote?: string; // CSV 시연일 때 로비에 표시
  onGameStart?: () => void;
}

function GameFlow({ level, score, sourceNote, onGameStart }: GameFlowProps) {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("lobby");
  const [round, setRound] = useState(0); // 게임을 새로 시작할 때마다 판을 새로 만든다
  const [resultMs, setResultMs] = useState(0);
  const [savedId, setSavedId] = useState<string | null>(null);

  // 게임 화면 그림·GIF를 로비에서 미리 받아 둔다
  useEffect(() => preloadImages(gameScreenImages), []);

  const isGame = screen === "game";

  return (
    <>
      <GameFonts />
      <Stage width={GAME_WIDTH} height={isGame ? GAME_HEIGHT : 820} label={SCREEN_LABEL[screen]}>
        {screen === "lobby" && (
          <LobbyScreen
            espLevel={level}
            sourceNote={sourceNote}
            onBackToDashboard={() => navigate("/")}
            onHowTo={() => setScreen("howto1")}
            onStart={() => {
              onGameStart?.();
              setRound((n) => n + 1);
              setScreen("game");
            }}
          />
        )}
        {screen === "howto1" && <HowToScreen page={1} onBack={() => setScreen("lobby")} onNext={() => setScreen("howto2")} />}
        {screen === "howto2" && <HowToScreen page={2} onBack={() => setScreen("howto1")} onNext={() => setScreen("lobby")} />}
        {screen === "game" && (
          <GameScreen
            key={round}
            score={score}
            onFinish={(ms) => {
              setResultMs(ms);
              setScreen("result");
            }}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            timeMs={resultMs}
            onSaved={(record) => {
              setSavedId(record.id);
              setScreen("ranking");
            }}
          />
        )}
        {screen === "ranking" && <RankingScreen highlightId={savedId} onBack={() => setScreen("lobby")} />}
      </Stage>
    </>
  );
}
