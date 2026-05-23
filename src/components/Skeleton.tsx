type Keypoint = {
  name: string;
  x: number;
  y: number;
  z?: number;
  confidence?: number;
};

type PersonFrame = {
  id: number;
  keypoints: Keypoint[];
};

interface SkeletonProps {
  frame: PersonFrame;
}

const bones = [
  ["nose", "left_eye"],
  ["nose", "right_eye"],
  ["left_eye", "left_ear"],
  ["right_eye", "right_ear"],

  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],

  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],

  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
];

export default function Skeleton({ frame }: SkeletonProps) {
  const getPoint = (name: string) =>
    frame.keypoints.find((point) => point.name === name);

  return (
    <svg width="600" height="600" style={{ border: "1px solid black" }}>
      {bones.map(([from, to]) => {
        const p1 = getPoint(from);
        const p2 = getPoint(to);

        if (!p1 || !p2) return null;

        return (
          <line
            key={`${from}-${to}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="blue"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}

      {frame.keypoints.map((point) => (
        <circle key={point.name} cx={point.x} cy={point.y} r="5" fill="red" />
      ))}
    </svg>
  );
}
