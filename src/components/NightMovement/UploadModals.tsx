// src/components/NightMovement/UploadModals.tsx

import { useRef, useState } from "react";
import type { DragEvent } from "react";

import * as S from "../../styles/NightMovement/Modal";
import { Button, Icon } from "../../styles/NightMovement/tokens";
import { formatMonthDay, formatTime, needsSeconds } from "../../utils/nightMovementFormat";
import Modal from "./Modal";

import checkCircleIcon from "../../assets/NightMovement/checkCircle.svg";

// 서버에 등록된 파일 정보 (업로드 응답)
export interface UploadedFileInfo {
  name: string;
  start: Date;
  end: Date;
  receivers: string[];
}

/* CSV 파일 업로드 */
interface UploadModalProps {
  // 서버로 올리는 중
  uploading?: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
}

export function UploadModal({ uploading = false, onClose, onFileSelected }: UploadModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && !uploading) onFileSelected(file);
  };

  return (
    <Modal title="CSV 파일 업로드" onClose={onClose} paddingBottom={23}>
      <S.Text $mt={17}>CSI 기록 파일을 선택해 분석합니다.</S.Text>

      <S.DropArea
        $active={dragging}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <p aria-live="polite">{uploading ? "파일을 올리고 확인하는 중입니다…" : "파일을 끌어 놓거나 선택하세요."}</p>
        <Button
          type="button"
          $variant="secondary"
          $width={150}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "업로드 중" : "파일 선택"}
        </Button>
        <S.HiddenInput
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) onFileSelected(file);
          }}
        />
      </S.DropArea>

      <S.Text $mt={15}>CSV · 최대 50MB</S.Text>
      <S.Text $mt={6}>필수 항목: 타임스탬프 · 수신기 · CSI 진폭</S.Text>

      <S.Footer $mt={53}>
        <Button type="button" $width={150} disabled>
          분석 시작
        </Button>
      </S.Footer>
    </Modal>
  );
}

/* 업로드 파일 확인 */
interface UploadConfirmModalProps {
  file: UploadedFileInfo;
  onClose: () => void;
  onAnalyze: () => void;
}

export function UploadConfirmModal({ file, onClose, onAnalyze }: UploadConfirmModalProps) {
  return (
    <Modal title="업로드 파일 확인" onClose={onClose} paddingBottom={23}>
      <S.Text $mt={26} $tone="navy">
        {file.name}
      </S.Text>
      <S.SuccessBadge $mt={18}>
        <Icon src={checkCircleIcon} alt="" width={20} height={20} />
        파일 확인 완료
      </S.SuccessBadge>
      <S.Text $mt={24}>
        기록 시간{" "}
        <b>{formatMonthDay(file.start)}</b> {formatTime(file.start, needsSeconds(file.start, file.end))} –{" "}
        <b>{formatMonthDay(file.end)}</b> {formatTime(file.end, needsSeconds(file.start, file.end))}
      </S.Text>
      <S.Text $mt={11}>수신기 {file.receivers.join(" · ")}</S.Text>
      <S.Text $mt={29}>분석 결과는 CSV 기록 조회 화면에 표시됩니다.</S.Text>

      <S.Footer $mt={90}>
        <Button type="button" $width={150} onClick={onAnalyze}>
          분석 시작
        </Button>
      </S.Footer>
    </Modal>
  );
}

/* CSV 분석 중 */
interface AnalyzingModalProps {
  progress: number;
  onClose: () => void;
}

export function AnalyzingModal({ progress, onClose }: AnalyzingModalProps) {
  return (
    <Modal title="CSV 분석 중" onClose={onClose} paddingBottom={52}>
      <S.Text $mt={28}>파일 구조와 움직임 구간을 분석하고 있습니다.</S.Text>
      <S.ProgressTrack
        role="progressbar"
        aria-label="CSV 분석 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <S.ProgressFill style={{ width: `${progress * 100}%` }} />
      </S.ProgressTrack>
      <S.Text $mt={22}>분석 중 · 잠시 기다려 주세요</S.Text>
      <S.Small $mt={45}>완료되면 CSV 기록 조회 화면으로 이동합니다.</S.Small>
    </Modal>
  );
}

/* 파일을 확인해 주세요 */
interface FileErrorModalProps {
  // 서버 안내 문구 (없으면 기본 안내)
  message?: string;
  onClose: () => void;
  onPickAnother: () => void;
}

export function FileErrorModal({ message, onClose, onPickAnother }: FileErrorModalProps) {
  return (
    <Modal title="파일을 확인해 주세요" onClose={onClose} paddingBottom={23}>
      <S.Text $mt={28} $tone="red">
        분석을 시작할 수 없습니다.
      </S.Text>
      <S.Text $mt={25}>{message ?? "필수 열이 없거나 파일 형식이 올바르지 않습니다."}</S.Text>
      <S.Text $mt={15}>타임스탬프, 수신기, CSI 진폭 항목을 확인하세요.</S.Text>
      <S.Footer $mt={106}>
        <Button type="button" $width={150} onClick={onPickAnother}>
          다른 파일 선택
        </Button>
      </S.Footer>
    </Modal>
  );
}

/* 분석하지 못했습니다 */
interface AnalysisFailedModalProps {
  // 서버 안내 문구 (없으면 기본 안내)
  message?: string;
  onClose: () => void;
  onPickAnother: () => void;
  onRetry: () => void;
}

export function AnalysisFailedModal({ message, onClose, onPickAnother, onRetry }: AnalysisFailedModalProps) {
  return (
    <Modal title="분석하지 못했습니다" onClose={onClose} paddingBottom={23}>
      <S.Text $mt={28} $tone="red">
        {message ?? "CSV 분석 중 오류가 발생했습니다."}
      </S.Text>
      <S.Text $mt={25}>같은 파일로 다시 시도하거나 다른 파일을 선택해 주세요.</S.Text>
      <S.Text $mt={15}>문제가 계속되면 파일 내용과 형식을 확인해 주세요.</S.Text>
      <S.Footer $mt={106}>
        <Button type="button" $variant="secondary" $width={150} onClick={onPickAnother}>
          다른 파일 선택
        </Button>
        <Button type="button" $width={150} onClick={onRetry}>
          다시 시도
        </Button>
      </S.Footer>
    </Modal>
  );
}
