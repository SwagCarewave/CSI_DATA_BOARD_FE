import { useEffect, useState } from "react";

import { getPoseSignals } from "../api/carewave";
import type { Frame } from "../api/types";
import { appendFrames, seriesFromSignals } from "../utils/signalSeries";
import type { SignalSeries } from "../utils/signalSeries";
import { subscribePoseFrames } from "./usePoseFeed";

export function usePoseSignals(windowSec: number) {
  const [series, setSeries] = useState<SignalSeries | null>(null);

  useEffect(() => {
    const keepMs = windowSec * 1000;
    let cancelled = false;
    let loaded = false;
    let pending: Frame[] = [];

    const unsubscribe = subscribePoseFrames((frames) => {
      if (!loaded) {
        pending = [...pending, ...frames];
        return;
      }
      setSeries((prev) => appendFrames(prev, frames, keepMs));
    });

    getPoseSignals({ window: windowSec, max_points: 1200 })
      .then((signals) => {
        if (cancelled) return;
        setSeries(appendFrames(seriesFromSignals(signals), pending, keepMs));
      })
      .catch(() => {
        if (!cancelled) setSeries((prev) => (pending.length ? appendFrames(prev, pending, keepMs) : prev));
      })
      .finally(() => {
        loaded = true;
        pending = [];
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [windowSec]);

  return series;
}
