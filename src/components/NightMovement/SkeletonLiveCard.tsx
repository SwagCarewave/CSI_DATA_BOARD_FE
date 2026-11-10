import { useEffect, useRef, useState } from "react";

import * as S from "../../styles/NightMovement/SkeletonLive";
import { Button, CardTitle, cw } from "../../styles/NightMovement/tokens";
import { recalibratePose } from "../../api/carewave";
import { errorMessage } from "../../api/client";
import type { PoseDrawModel, PoseReplayFrame } from "../../api/types";
import { usePoseFeed } from "../../hooks/usePoseFeed";
import type { PoseState } from "../../hooks/usePoseFeed";
import PoseModelSelect from "./PoseModelSelect";

const LOST_AFTER_SEC = 3;

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: Math.floor(entry.contentRect.width), height: Math.floor(entry.contentRect.height) }),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

function drawSkeleton(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  model: PoseDrawModel | null,
  pose: PoseReplayFrame | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const pixelWidth = Math.round(width * dpr);
  const pixelHeight = Math.round(height * dpr);
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (!model || !pose || width === 0 || height === 0) return;
  if (pose.person_present === false) return;

  const [imageWidth, imageHeight] = model.image_size ?? [width, height];
  const scale = Math.min(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const left = (width - drawWidth) / 2;
  const top = (height - drawHeight) / 2;

  if (model.image_size) {
    ctx.fillStyle = "#F7F7F7";
    ctx.fillRect(left, top, drawWidth, drawHeight);
  }

  const points = new Map(pose.smoothed.map((p) => [p.name, [left + p.x * drawWidth, top + p.y * drawHeight] as const]));
  const uncertain = pose.posture.code === "uncertain";

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = cw.blue;
  ctx.globalAlpha = uncertain ? 0.25 : 1;
  for (const [a, b] of model.skeleton) {
    const from = points.get(a);
    const to = points.get(b);
    if (!from || !to) continue;
    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
  }

  ctx.globalAlpha = uncertain ? 0.6 : 1;
  ctx.lineWidth = 2;
  ctx.strokeStyle = cw.navy;
  ctx.fillStyle = cw.white;
  for (const name of model.points) {
    const point = points.get(name);
    if (!point) continue;
    ctx.beginPath();
    ctx.arc(point[0], point[1], name === "nose" ? 6 : 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

type OverlayInfo = { title: string; caption: string; progress?: number } | null;

const NOBODY: OverlayInfo = { title: "영역 안에 사람이 없습니다.", caption: "ESP 6대 안쪽으로 들어오면 스켈레톤이 표시됩니다." };

function overlayFor(s: PoseState): OverlayInfo {
  if (s.unavailable) return { title: "서버에서 자세 모델이 꺼져 있습니다.", caption: "백엔드 설정을 확인해 주세요." };
  if (!s.connected) return { title: "서버에 연결하는 중입니다.", caption: "잠시만 기다려 주세요." };
  if (s.linksOk === 0) {
    return s.pose
      ? { title: "ESP 신호가 끊겼습니다.", caption: "마지막으로 추정한 자세를 표시하고 있습니다." }
      : { title: "ESP 6대 신호를 기다리는 중입니다.", caption: "ESP가 연결되면 스켈레톤이 표시됩니다." };
  }
  if (s.calibration?.active) {
    const emptyRoom = s.calibration.mode === "empty_room";
    const percent = Math.round(s.calibration.progress * 100);
    return {
      title: emptyRoom ? "ESP 6대 영역 밖으로 나가 방을 비워 주세요." : "서서 가만히 있어 주세요.",
      caption: emptyRoom
        ? `빈 방 보정 중 ${percent}% · 약 ${Math.ceil((1 - s.calibration.progress) * s.calibration.seconds)}초 남음`
        : `보정 중 ${percent}%`,
      progress: s.calibration.progress,
    };
  }
  if (!s.pose) return { title: "자세를 추정하는 중입니다.", caption: "잠시만 기다려 주세요." };
  if (s.pose.person_present === false) return NOBODY;
  if ((s.secondsSinceLastRecord ?? 0) > LOST_AFTER_SEC) {
    return { title: "ESP 신호가 끊겼습니다.", caption: "마지막으로 추정한 자세를 표시하고 있습니다." };
  }
  return null;
}

function replayOverlay(model: PoseDrawModel | null, current: PoseReplayFrame | null, notice?: OverlayInfo): OverlayInfo {
  if (notice) return notice;
  if (!model) return { title: "재생을 준비하는 중입니다.", caption: "잠시만 기다려 주세요." };
  if (current) return current.person_present === false ? NOBODY : null;
  return model.image_size
    ? { title: "보정 구간입니다.", caption: "13관절 모델은 녹화 앞 10초 동안 스켈레톤이 없습니다." }
    : { title: "이 시각의 스켈레톤이 없습니다.", caption: "재생바를 옮겨 보세요." };
}

interface SkeletonLiveCardProps {
  onSelectEsp4: () => void;
  replay?: { model: PoseDrawModel | null; current: PoseReplayFrame | null; notice?: OverlayInfo };
}

export default function SkeletonLiveCard({ onSelectEsp4, replay }: SkeletonLiveCardProps) {
  const feed = usePoseFeed((s) => s);
  const [screenRef, size] = useElementSize<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recalibrating, setRecalibrating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const model = replay ? replay.model : feed.model;
  const pose = replay ? replay.current : feed.pose;

  useEffect(() => {
    if (canvasRef.current) drawSkeleton(canvasRef.current, size.width, size.height, model, pose);
  }, [size.width, size.height, model, pose]);

  const overlay = replay ? replayOverlay(replay.model, replay.current, replay.notice) : overlayFor(feed);
  const nobody = pose?.person_present === false;
  const linkTone = feed.ready ? "ok" : feed.linksOk > 0 ? "warn" : "off";

  const recalibrate = () => {
    setRecalibrating(true);
    setActionError(null);
    recalibratePose()
      .catch((e) => setActionError(errorMessage(e)))
      .finally(() => setRecalibrating(false));
  };

  return (
    <S.SkeletonCard aria-label={replay ? "스켈레톤 재생" : "스켈레톤 실시간"}>
      <S.Header>
        <CardTitle>{replay ? "스켈레톤 재생" : "스켈레톤 실시간"}</CardTitle>
        {!replay && (
          <S.HeaderActions>
            <PoseModelSelect activeName={feed.model?.name ?? null} onSelectEsp4={onSelectEsp4} onError={setActionError} />
            <S.LinkBadge $tone={linkTone}>
              연결 {feed.linksOk}/{feed.linksTotal}
            </S.LinkBadge>
          </S.HeaderActions>
        )}
      </S.Header>

      <S.Screen ref={screenRef}>
        <S.Canvas ref={canvasRef} role="img" aria-label={pose && !nobody ? `${pose.action.label}, ${pose.posture.label}` : "스켈레톤 없음"} />
        {overlay && (
          <S.Overlay>
            {overlay.title}
            {overlay.progress !== undefined && <S.Progress $ratio={overlay.progress} />}
            <span>{overlay.caption}</span>
          </S.Overlay>
        )}
      </S.Screen>

      <S.Footer>
        {actionError ? (
          <S.Status $dim={false} role="status">
            <em>{actionError}</em>
          </S.Status>
        ) : (
          <S.Status $dim={!pose || nobody || pose.posture.code === "uncertain"}>
            {nobody ? (
              <em>사람 없음</em>
            ) : pose ? (
              <>
                {pose.action.label} <em>· {pose.posture.label}</em>
              </>
            ) : (
              <em>행동 —</em>
            )}
          </S.Status>
        )}
        {!replay && feed.calibration?.required && (
          <Button
            type="button"
            $variant="secondary"
            $width={88}
            $height={32}
            disabled={!feed.connected || recalibrating}
            onClick={recalibrate}
          >
            다시 보정
          </Button>
        )}
      </S.Footer>
    </S.SkeletonCard>
  );
}
