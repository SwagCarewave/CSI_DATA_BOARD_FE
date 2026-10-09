// src/components/NightMovement/CsvPlayback.tsx

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

import * as S from "../../styles/NightMovement/CsvControls";
import * as M from "../../styles/NightMovement/Menu";
import { Button, Icon, SelectTrigger } from "../../styles/NightMovement/tokens";
import { playbackSpeeds } from "../../data/nightMovement";
import type { PlaybackSpeed } from "../../data/nightMovement";
import { formatMonthDay, formatTime, needsSeconds } from "../../utils/nightMovementFormat";
import { useDismiss } from "./useDismiss";

import chevronDownIcon from "../../assets/NightMovement/chevronDown.svg";
import seekThumbIcon from "../../assets/NightMovement/seekThumb.svg";

interface CsvPlaybackProps {
  start: Date;
  end: Date;
  progress: number;
  playing: boolean;
  speed: PlaybackSpeed;
  onTogglePlay: () => void;
  onSeek: (progress: number) => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

const pad = (value: number) => String(value).padStart(2, "0");

export default function CsvPlayback({
  start,
  end,
  progress,
  playing,
  speed,
  onTogglePlay,
  onSeek,
  onSpeedChange,
}: CsvPlaybackProps) {
  const [speedOpen, setSpeedOpen] = useState(false);
  const closeSpeed = useCallback(() => setSpeedOpen(false), []);
  const speedRef = useDismiss<HTMLDivElement>(speedOpen, closeSpeed);
  const trackRef = useRef<HTMLDivElement>(null);

  const seconds = needsSeconds(start, end);
  const current = new Date(start.getTime() + progress * (end.getTime() - start.getTime()));
  const currentLabel = `${pad(current.getMonth() + 1)}월 ${pad(current.getDate())}일 ${formatTime(current, seconds)}`;

  const seekFromPointer = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    onSeek(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromPointer(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) seekFromPointer(e.clientX);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // 방향키 한 번에 1%(10시간 기준 6분)씩 이동
    if (e.key === "ArrowRight") onSeek(Math.min(1, progress + 0.01));
    if (e.key === "ArrowLeft") onSeek(Math.max(0, progress - 0.01));
  };

  return (
    <S.Playback aria-label="CSV 기록 재생">
      <Button type="button" onClick={onTogglePlay}>
        {playing ? "Ⅱ 일시정지" : "▶ 재생"}
      </Button>

      <S.Seek>
        <S.SeekInfo>
          <S.PlayTime>
            재생 시각<span>{currentLabel}</span>
          </S.PlayTime>
          <S.PlayRange>
            {formatMonthDay(start)} {formatTime(start, seconds)} – {formatMonthDay(end)} {formatTime(end, seconds)}
          </S.PlayRange>
        </S.SeekInfo>

        <S.Track
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="재생 위치"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={currentLabel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onKeyDown={handleKeyDown}
        >
          <S.TrackFill style={{ width: `${progress * 100}%` }} />
          <S.Thumb
            src={seekThumbIcon}
            alt=""
            width={14}
            height={14}
            style={{ left: `calc(${progress * 100}% - 7px)` }}
          />
        </S.Track>
      </S.Seek>

      <M.Anchor ref={speedRef}>
        <SelectTrigger
          type="button"
          $width={153}
          aria-haspopup="listbox"
          aria-expanded={speedOpen}
          aria-label={`재생 배속 ${speed}배속`}
          onClick={() => setSpeedOpen((prev) => !prev)}
        >
          {speed}배속
          <Icon src={chevronDownIcon} alt="" width={16} height={16} />
        </SelectTrigger>

        {speedOpen && (
          <M.Popover $align="right">
            <M.SpeedMenu role="listbox" aria-label="재생 배속">
              {playbackSpeeds.map((option) => (
                <M.SpeedOption
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={option === speed}
                  $selected={option === speed}
                  onClick={() => {
                    onSpeedChange(option);
                    closeSpeed();
                  }}
                >
                  {option}배속
                  {option === speed && <span>✓</span>}
                </M.SpeedOption>
              ))}
            </M.SpeedMenu>
          </M.Popover>
        )}
      </M.Anchor>
    </S.Playback>
  );
}
