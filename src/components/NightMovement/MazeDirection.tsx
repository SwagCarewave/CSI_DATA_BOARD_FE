// src/components/NightMovement/MazeDirection.tsx

// 미로 빠져나가기 (테스트): 서버가 2초마다 보내는 방향(좌/우/상)을
// 들어온 순간에 한 칸씩 오른쪽에 붙이고, 줄 전체가 왼쪽으로 흘러가는 큐로 보여 준다 (최근 15개)

import styled, { css, keyframes } from "styled-components";

import type { MazeStatus, MazeStep } from "../../hooks/useLiveSession";
import { Card, VisuallyHidden, cw, media } from "../../styles/NightMovement/tokens";

// 서버가 방향을 보내는 간격. 한 칸 흐르는 데 이만큼 걸려서, 값이 제때 오면 멈춤 없이 이어진다
const STEP_MS = 2000;
const TILE = 52;
const GAP = 8;
const SLOT = TILE + GAP;

// 방향별 색 (글자, 배경)
const directionColors: Record<string, { color: string; bg: string }> = {
  상: { color: "#FFFFFF", bg: cw.blue },
  우: { color: "#FFFFFF", bg: cw.success },
  좌: { color: "#FFFFFF", bg: "#8B5CF6" },
};
const unknownColors = { color: cw.muted, bg: cw.falseBg };

interface MazeDirectionProps {
  running: boolean;
  steps: MazeStep[];
  status: MazeStatus | null;
}

// 준비 중·신호 이상이면 그 문구, 아니면 마지막으로 받은 방향 (null 프레임에서는 이전 글자 유지)
const statusText = (running: boolean, latest: MazeStep | undefined, status: MazeStatus | null) => {
  if (!running) return { text: "취침 모드를 켜면 방향을 받습니다", tone: "idle" as const };
  if (status && (status.state === "signal_check" || !status.signalOk)) return { text: "신호 확인 필요", tone: "warn" as const };
  if (!status || status.state === "baseline_prep" || !latest) return { text: "준비 중", tone: "idle" as const };
  return { text: latest.text, tone: "direction" as const };
};

export default function MazeDirection({ running, steps, status }: MazeDirectionProps) {
  const latest = steps.at(-1);
  const current = statusText(running, latest, status);

  return (
    <Box aria-label="미로 방향 (테스트)">
      <Current>
        <Label>미로 방향 (테스트)</Label>
        <Value $big={current.tone === "direction"} $warn={current.tone === "warn"}>
          {current.text}
        </Value>
      </Current>

      <Track>
        {/* 새 칸이 들어올 때마다 한 칸 오른쪽에서 출발해 2초 동안 일정한 속도로 미끄러진다 */}
        <Strip key={latest?.id ?? 0} $animate={steps.length > 0}>
          {steps.map((step) => {
            const colors = directionColors[step.text] ?? unknownColors;
            return (
              <Tile key={step.id} $color={colors.color} $bg={colors.bg} $latest={step.id === latest?.id}>
                {step.text}
              </Tile>
            );
          })}
        </Strip>
      </Track>

      {/* 화면 읽기 프로그램에는 최신 방향만 알린다 */}
      <VisuallyHidden aria-live="polite">{latest?.text ?? ""}</VisuallyHidden>
    </Box>
  );
}

const slide = keyframes`
  from {
    transform: translateX(${SLOT}px);
  }
  to {
    transform: translateX(0);
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.7);
  }
`;

const Box = styled(Card)`
  padding: 14px 24px;

  display: flex;
  align-items: center;
  gap: 24px;

  ${media.mobile} {
    padding: 14px 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const Current = styled.div`
  width: 170px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 2px;

  ${media.mobile} {
    width: auto;
  }
`;

const Label = styled.span`
  color: ${cw.muted};
  font-size: 13px;
  font-weight: 700;
`;

const Value = styled.strong<{ $big: boolean; $warn: boolean }>`
  color: ${({ $big, $warn }) => ($warn ? cw.red : $big ? cw.navy : cw.muted)};
  font-size: ${({ $big }) => ($big ? "36px" : "15px")};
  font-weight: 800;
  line-height: 1.25;
`;

const Track = styled.div`
  flex: 1;
  min-width: 0;
  height: ${TILE + 8}px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;

  border-radius: 10px;
  background-color: ${cw.pale};
  box-shadow: inset 0 0 0 1px ${cw.border};

  /* 왼쪽 끝에서 흐려지며 사라지게 */
  mask-image: linear-gradient(to right, transparent 0, #000 48px);
`;

// 오른쪽에 한 칸을 비워 두어, 새 칸이 그 자리에서 나타나 왼쪽으로 흘러가게 한다 (최신 칸이 항상 다 보임)
const Strip = styled.div<{ $animate: boolean }>`
  padding: 0 ${SLOT + 4}px 0 4px;

  display: flex;
  gap: ${GAP}px;
  flex-shrink: 0;

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slide} ${STEP_MS}ms linear both;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Tile = styled.div<{ $color: string; $bg: string; $latest: boolean }>`
  width: ${TILE}px;
  height: ${TILE}px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background-color: ${({ $bg }) => $bg};
  box-shadow: ${({ $latest }) => ($latest ? `0 0 0 3px ${cw.navy}` : "none")};
  ${({ $latest }) =>
    $latest &&
    css`
      animation: ${appear} 300ms ease-out both;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  color: ${({ $color }) => $color};
  font-size: 22px;
  font-weight: 800;
`;
