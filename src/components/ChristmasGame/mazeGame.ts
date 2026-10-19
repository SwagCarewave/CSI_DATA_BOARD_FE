// src/components/ChristmasGame/mazeGame.ts

// 미로 게임 규칙 (피그마 "04 크리스마스 게임" 게임 방법)
// - 모델 출력값(0~1)으로 방향을 정한다: 상 0.0~0.2 / 좌 0.2~0.8 / 우 0.8~1.0
// - 방향이 바뀌면 곧바로, 같은 방향이 2초 이어지면 같은 화살표를 하나 더 지팡이 맨 아래 칸에 넣는다
//   (몸통 4칸이 가득 차 있으면 넣지 않고, 자리가 나면 넣는다 → 중간에 사라지는 화살표 없음)
// - 2초마다 몸통 맨 위 화살표가 갈고리로 넘어간다
// - 정답 경로는 고정: 갈고리 화살표가 경로의 "다음 칸 방향"과 같을 때만 한 칸 전진하고, 다르면 그 자리에 있는다
//   (틀린 방향이 나와도 뒤로 가거나 도착지에서 멀어지지 않는다)

export type Direction = "up" | "left" | "right";

export const UP_MAX = 0.2;
export const LEFT_MAX = 0.8;
export const ARROW_REPEAT_MS = 2000;
export const HOOK_INTERVAL_MS = 2000;
export const CANE_SLOTS = 4;

export const directionFromScore = (score: number): Direction =>
  score < UP_MAX ? "up" : score < LEFT_MAX ? "left" : "right";

// 미로 이미지(1254×1254) 위 길 칸의 가운데 좌표. 출발(왼쪽 아래) → 도착(오른쪽 위) 순서
const MAZE_IMAGE_SIZE = 1254;
const PATH_PX: [number, number][] = [
  [134, 1154],
  [140, 1072],
  [224, 1064],
  [228, 987],
  [307, 984],
  [388, 983],
  [472, 984],
  [554, 980],
  [556, 902],
  [554, 822],
  [476, 819],
  [394, 816],
  [392, 732],
  [394, 650],
  [486, 647],
  [576, 641],
  [580, 554],
  [582, 468],
  [660, 466],
  [741, 466],
  [820, 454],
  [822, 362],
  [826, 280],
  [912, 278],
  [1000, 273],
  [1006, 194],
  [1087, 192],
  [1168, 187],
  [1174, 105],
];

// 미로 그림 안에서의 비율 좌표 (0~1)
// 그림에서 잰 좌표는 몇 px씩 어긋나 있으므로, 세로로 이어진 칸끼리는 x를, 가로로 이어진 칸끼리는 y를 평균으로 맞춘다
// → 위로 갈 때는 정확히 수직으로, 옆으로 갈 때는 정확히 수평으로 움직인다
function alignToGrid(points: [number, number][]) {
  const result = points.map(([x, y]) => ({ x, y }));
  const align = (axis: "x" | "y", sameLine: (a: [number, number], b: [number, number]) => boolean) => {
    let start = 0;
    for (let i = 1; i <= points.length; i++) {
      if (i < points.length && sameLine(points[i - 1], points[i])) continue;
      const group = result.slice(start, i);
      const mean = group.reduce((sum, p) => sum + p[axis], 0) / group.length;
      group.forEach((p) => (p[axis] = mean));
      start = i;
    }
  };
  const vertical = (a: [number, number], b: [number, number]) => Math.abs(b[1] - a[1]) > Math.abs(b[0] - a[0]);
  align("x", vertical);
  align("y", (a, b) => !vertical(a, b));
  return result;
}

export const PATH = alignToGrid(PATH_PX).map(({ x, y }) => ({ x: x / MAZE_IMAGE_SIZE, y: y / MAZE_IMAGE_SIZE }));
export const START_CELL = 0;
export const GOAL_CELL = PATH.length - 1;

// 정답 경로에서 지금 칸 다음으로 가야 할 방향 (도착 칸이면 null)
export function nextDirection(cell: number): Direction | null {
  const from = PATH[cell];
  const to = PATH[cell + 1];
  if (!to) return null;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dy) > Math.abs(dx)) return "up"; // 경로는 아래로 가는 칸이 없다
  return dx > 0 ? "right" : "left";
}

export const formatGameTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(total / 60))} : ${pad(total % 60)}`;
};
