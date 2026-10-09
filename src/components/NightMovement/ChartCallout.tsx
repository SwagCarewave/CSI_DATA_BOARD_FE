// src/components/NightMovement/ChartCallout.tsx

// 주요 움직임 구간 말풍선 (시각 + "움직임 급증"/"짧은 움직임")

import { chartColors } from "../../styles/NightMovement/Charts";
import { CALLOUT_HEIGHT, CALLOUT_WIDTH } from "../../utils/chartCallouts";
import type { PlacedCallout } from "../../utils/chartCallouts";
import { formatClock } from "../../utils/chartScale";

export default function ChartCallout({ callout, showSeconds }: { callout: PlacedCallout; showSeconds: boolean }) {
  const { segment, boxX, boxY } = callout;
  const isSurge = segment.kind === "surge";

  return (
    <g transform={`translate(${boxX}, ${boxY})`} style={{ filter: "drop-shadow(0 2px 6px rgba(9, 29, 98, 0.16))" }}>
      <rect width={CALLOUT_WIDTH} height={CALLOUT_HEIGHT} rx={8} fill="#FFFFFF" />
      <circle cx={13} cy={12} r={4.5} fill="#FFFFFF" stroke={chartColors.marker} strokeWidth={3} />
      <text x={24} y={15} fontSize={10} fill={chartColors.navy}>
        {formatClock(segment.peakMs, showSeconds)}
      </text>
      <text x={24} y={29} fontSize={11.5} fontWeight={700} fill={isSurge ? chartColors.marker : chartColors.navy}>
        {isSurge ? "움직임 급증" : "짧은 움직임"}
      </text>
    </g>
  );
}
