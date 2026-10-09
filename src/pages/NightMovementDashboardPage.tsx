// src/pages/NightMovementDashboardPage.tsx

import { useEffect, useRef, useState } from "react";

import * as S from "../styles/NightMovement/NightMovementDashboardPage";

import DashboardHeader from "../components/NightMovement/DashboardHeader";
import type { DashboardMode } from "../components/NightMovement/DashboardHeader";
import RealtimeControlBar from "../components/NightMovement/RealtimeControlBar";
import ObservationSummary from "../components/NightMovement/ObservationSummary";
import MovementGraphCard from "../components/NightMovement/MovementGraphCard";
import WifiHeatmapCard from "../components/NightMovement/WifiHeatmapCard";
import MovementChart from "../components/NightMovement/MovementChart";
import HeatmapChart from "../components/NightMovement/HeatmapChart";
import ActivityRecordsCard from "../components/NightMovement/ActivityRecordsCard";
import RangeSelect from "../components/NightMovement/RangeSelect";
import CsvToolbar from "../components/NightMovement/CsvToolbar";
import CsvEmptyToolbar from "../components/NightMovement/CsvEmptyToolbar";
import CsvPlayback from "../components/NightMovement/CsvPlayback";
import {
  AllRecordsModal,
  CaregiverResultModal,
  EventDetailModal,
  SavedModal,
} from "../components/NightMovement/EventModals";
import type { RecordTab } from "../components/NightMovement/EventModals";
import {
  AnalysisFailedModal,
  AnalyzingModal,
  FileErrorModal,
  UploadConfirmModal,
  UploadModal,
} from "../components/NightMovement/UploadModals";

import {
  eventsFromAnalysis,
  graphRangeOptions,
  initialReceivers,
  realtimeDemoFile,
  realtimeInfo,
  recordFromAnalysis,
  sampleCsvFiles,
} from "../data/nightMovement";
import type { ActivityEvent, CsvRecord, EventStatus, GraphRange, PlaybackSpeed } from "../data/nightMovement";
import { analyzeCsiInWorker, CsiWorkerError } from "../utils/analyzeCsiInWorker";
import type { CsiAnalysis } from "../utils/csiAnalysis";
import { inspectCsiCsv } from "../utils/csiCsv";
import type { CsvInspection } from "../utils/csiCsv";
import { formatClock } from "../utils/chartScale";
import type { TimeView } from "../utils/chartScale";
import { formatDuration } from "../utils/nightMovementFormat";

const GRAPH_HEIGHT = 250;
const HEATMAP_HEIGHT = 138;
const PLAYBACK_TICK_MS = 250;

type ModalState =
  | { type: "none" }
  | { type: "allRecords"; tab: RecordTab }
  | { type: "detail"; eventId: string }
  | { type: "result"; eventId: string }
  | { type: "saved" }
  | { type: "upload" }
  | { type: "uploadConfirm"; file: CsvInspection }
  | { type: "fileError" }
  | { type: "analyzing"; file: CsvInspection }
  | { type: "analysisFailed"; file: CsvInspection };

// 작은 파일도 진행 화면이 깜빡이지 않도록 최소 시간만큼 기다린다
const atLeast = async <T,>(promise: Promise<T>, ms: number) => {
  const [result] = await Promise.all([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
  return result;
};

const rangeMs = (range: GraphRange) => graphRangeOptions.find((option) => option.value === range)?.ms ?? Infinity;

// 실시간: 가장 최근 N분
const latestView = (analysis: CsiAnalysis, range: GraphRange): TimeView => ({
  startMs: Math.max(analysis.startMs, analysis.endMs - rangeMs(range)),
  endMs: analysis.endMs,
});

// CSV: 재생 위치를 가운데에 두고 N분 (기록 범위를 넘지 않게)
const playbackView = (analysis: CsiAnalysis, range: GraphRange, playheadMs: number): TimeView => {
  const length = rangeMs(range);
  const total = analysis.endMs - analysis.startMs;
  if (length >= total) return { startMs: analysis.startMs, endMs: analysis.endMs };
  const startMs = Math.min(Math.max(analysis.startMs, playheadMs - length / 2), analysis.endMs - length);
  return { startMs, endMs: startMs + length };
};

export default function NightMovementDashboardPage() {
  const [mode, setMode] = useState<DashboardMode>("realtime");
  const [modal, setModal] = useState<ModalState>({ type: "none" });

  // 실시간 (실제 수신 데이터가 연결되기 전까지 예시 CSV로 표시)
  const [sleepMode, setSleepMode] = useState(realtimeInfo.sleepMode);
  const [realtimeRange, setRealtimeRange] = useState<GraphRange>("10m");
  const [realtimeAnalysis, setRealtimeAnalysis] = useState<CsiAnalysis | null>(null);
  const [realtimeEvents, setRealtimeEvents] = useState<ActivityEvent[]>([]);

  // CSV 기록 조회
  const [samplesLoading, setSamplesLoading] = useState(true);
  const [csvRecords, setCsvRecords] = useState<CsvRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [csvRange, setCsvRange] = useState<GraphRange>("all");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const analysisToken = useRef(0);

  const selectedRecord = csvRecords.find((record) => record.id === selectedRecordId) ?? null;
  const currentEvents = mode === "realtime" ? realtimeEvents : (selectedRecord?.events ?? null);
  const closeModal = () => setModal({ type: "none" });

  // 예시 CSV 분석 (src/data/csi_raw)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const records: CsvRecord[] = [];
      for (const [index, sample] of sampleCsvFiles.entries()) {
        try {
          const analysis = await analyzeCsiInWorker(sample.url);
          records.push(recordFromAnalysis(`sample-${index}`, sample.name, analysis));
          if (sample === realtimeDemoFile && !cancelled) {
            setRealtimeAnalysis(analysis);
            setRealtimeEvents(eventsFromAnalysis("rt", analysis));
          }
        } catch (error) {
          console.error(`${sample.name} 분석 실패`, error);
        }
      }
      if (cancelled) return;
      setCsvRecords((prev) => [...prev, ...records]);
      setSelectedRecordId((prev) => prev ?? records[0]?.id ?? null);
      setSamplesLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectRecord = (id: string | null) => {
    setSelectedRecordId(id);
    setProgress(0);
  };

  // 끝까지 재생하면 자동으로 멈춘 상태가 된다
  const isPlaying = playing && progress < 1;

  // 재생: 1배속 = 실제 기록 시간과 같은 속도
  useEffect(() => {
    if (mode !== "csv" || !isPlaying || !selectedRecord) return;
    const durationMs = selectedRecord.end.getTime() - selectedRecord.start.getTime();
    const timer = window.setInterval(() => {
      setProgress((prev) => Math.min(1, prev + (speed * PLAYBACK_TICK_MS) / durationMs));
    }, PLAYBACK_TICK_MS);
    return () => window.clearInterval(timer);
  }, [mode, isPlaying, speed, selectedRecord]);

  const deleteRecord = (id: string) => {
    const remaining = csvRecords.filter((record) => record.id !== id);
    setCsvRecords(remaining);
    if (id === selectedRecordId) selectRecord(remaining[0]?.id ?? null);
  };

  const updateEventStatus = (eventId: string, status: EventStatus) => {
    const apply = (events: ActivityEvent[]) =>
      events.map((event) => (event.id === eventId ? { ...event, status } : event));

    if (mode === "realtime") {
      setRealtimeEvents(apply);
    } else {
      setCsvRecords((prev) =>
        prev.map((record) =>
          record.id === selectedRecordId ? { ...record, events: apply(record.events) } : record,
        ),
      );
    }
  };

  const handleFileSelected = async (file: File) => {
    const result = await inspectCsiCsv(file);
    setModal(result.ok ? { type: "uploadConfirm", file: result.data } : { type: "fileError" });
  };

  // 업로드한 CSV 분석 (Web Worker, 실제 진행률 표시)
  const startAnalysis = async (file: CsvInspection) => {
    const token = ++analysisToken.current;
    setAnalysisProgress(0);
    setModal({ type: "analyzing", file });

    try {
      const analysis = await atLeast(
        analyzeCsiInWorker(file.file, (ratio) => {
          if (analysisToken.current === token) setAnalysisProgress(ratio);
        }),
        600,
      );
      if (analysisToken.current !== token) return;

      const id = `upload-${token}`;
      setCsvRecords((prev) => [recordFromAnalysis(id, file.name, analysis), ...prev]);
      selectRecord(id);
      setPlaying(true);
      setMode("csv");
      setModal({ type: "none" });
    } catch (error) {
      if (analysisToken.current !== token) return;
      const isFormat = error instanceof CsiWorkerError && error.reason === "format";
      setModal(isFormat ? { type: "fileError" } : { type: "analysisFailed", file });
    }
  };

  const cancelAnalysis = () => {
    analysisToken.current++;
    closeModal();
  };

  const openEvent = (event: ActivityEvent) => setModal({ type: "detail", eventId: event.id });
  const findEvent = (id: string) => currentEvents?.find((event) => event.id === id);

  const renderModal = () => {
    switch (modal.type) {
      case "allRecords":
        return (
          <AllRecordsModal
            events={currentEvents ?? []}
            initialTab={modal.tab}
            onClose={closeModal}
            onSelectEvent={openEvent}
          />
        );
      case "detail": {
        const event = findEvent(modal.eventId);
        if (!event) return null;
        return (
          <EventDetailModal
            event={event}
            onClose={closeModal}
            onSelectResult={() => setModal({ type: "result", eventId: event.id })}
          />
        );
      }
      case "result":
        return (
          <CaregiverResultModal
            onClose={closeModal}
            onSubmit={(result) => {
              updateEventStatus(modal.eventId, result);
              setModal({ type: "saved" });
            }}
          />
        );
      case "saved":
        return <SavedModal onClose={closeModal} />;
      case "upload":
        return <UploadModal onClose={closeModal} onFileSelected={handleFileSelected} />;
      case "uploadConfirm":
        return (
          <UploadConfirmModal file={modal.file} onClose={closeModal} onAnalyze={() => startAnalysis(modal.file)} />
        );
      case "fileError":
        return <FileErrorModal onClose={closeModal} onPickAnother={() => setModal({ type: "upload" })} />;
      case "analyzing":
        return <AnalyzingModal progress={analysisProgress} onClose={cancelAnalysis} />;
      case "analysisFailed":
        return (
          <AnalysisFailedModal
            onClose={closeModal}
            onPickAnother={() => setModal({ type: "upload" })}
            onRetry={() => startAnalysis(modal.file)}
          />
        );
      default:
        return null;
    }
  };

  const recordsCard = (
    <ActivityRecordsCard
      events={currentEvents}
      compact={mode === "csv"}
      onViewAll={() => setModal({ type: "allRecords", tab: "all" })}
      onViewUnconfirmed={() => setModal({ type: "allRecords", tab: "pending" })}
      onSelectEvent={openEvent}
    />
  );

  const realtimeView = realtimeAnalysis ? latestView(realtimeAnalysis, realtimeRange) : null;
  const playheadMs = selectedRecord
    ? selectedRecord.analysis.startMs + progress * (selectedRecord.analysis.endMs - selectedRecord.analysis.startMs)
    : 0;
  const csvView = selectedRecord ? playbackView(selectedRecord.analysis, csvRange, playheadMs) : null;

  return (
    <S.Page>
      <S.Board>
        <DashboardHeader mode={mode} onModeChange={setMode} />

        {mode === "realtime" && (
          <>
            <RealtimeControlBar
              sleepMode={sleepMode}
              onSleepModeChange={setSleepMode}
              observationStart={realtimeAnalysis ? formatClock(realtimeAnalysis.startMs, false) : "—"}
              receivers={initialReceivers}
              lastSignal={realtimeInfo.lastSignal}
            />

            <S.Row>
              <S.LeftColumn>
                <ObservationSummary
                  timeLabel="관찰 시간"
                  timeValue={realtimeAnalysis ? formatDuration(realtimeAnalysis.endMs - realtimeAnalysis.startMs) : "—"}
                  timeExtra={
                    realtimeAnalysis
                      ? `${formatClock(realtimeAnalysis.startMs, false)} ~ ${formatClock(realtimeAnalysis.endMs, false)}`
                      : undefined
                  }
                  eventsLabel="감지된 주요 움직임"
                  eventsValue={realtimeAnalysis ? `${realtimeEvents.length}건` : "—"}
                />
                <MovementGraphCard
                  subtitle="시간에 따른 움직임의 강도를 분석한 결과입니다."
                  action={<RangeSelect value={realtimeRange} onChange={setRealtimeRange} />}
                  emptyText="데이터를 불러오는 중입니다"
                  chart={
                    realtimeAnalysis &&
                    realtimeView && <MovementChart analysis={realtimeAnalysis} view={realtimeView} height={GRAPH_HEIGHT} />
                  }
                />
              </S.LeftColumn>
              {recordsCard}
            </S.Row>

            <S.Row>
              <WifiHeatmapCard
                subtitle="RX1 · RX2 · RX3 신호를 함께 표시합니다."
                emptyText="데이터를 불러오는 중입니다"
                chart={
                  realtimeAnalysis &&
                  realtimeView && <HeatmapChart analysis={realtimeAnalysis} view={realtimeView} height={HEATMAP_HEIGHT} />
                }
              />
            </S.Row>
          </>
        )}

        {mode === "csv" && selectedRecord && csvView && (
          <>
            <CsvToolbar
              records={csvRecords}
              selected={selectedRecord}
              onSelect={selectRecord}
              onDelete={deleteRecord}
              onUpload={() => setModal({ type: "upload" })}
            />

            <S.Row>
              <div style={{ width: "100%" }}>
                <CsvPlayback
                  start={selectedRecord.start}
                  end={selectedRecord.end}
                  progress={progress}
                  playing={isPlaying}
                  speed={speed}
                  onTogglePlay={() => {
                    if (progress >= 1) {
                      setProgress(0);
                      setPlaying(true);
                      return;
                    }
                    setPlaying((prev) => !prev);
                  }}
                  onSeek={setProgress}
                  onSpeedChange={setSpeed}
                />
              </div>
            </S.Row>

            <S.Row>
              <S.LeftColumn>
                <ObservationSummary
                  timeLabel="기록 시간"
                  timeValue={formatDuration(selectedRecord.end.getTime() - selectedRecord.start.getTime())}
                  eventsLabel="감지된 활동 사건"
                  eventsValue={`${selectedRecord.events.length}건`}
                />
                <MovementGraphCard
                  subtitle="재생 시각에 맞춰 움직임 그래프와 CSI 히트맵이 함께 갱신됩니다."
                  action={<RangeSelect variant="button" value={csvRange} onChange={setCsvRange} />}
                  chart={
                    <MovementChart
                      analysis={selectedRecord.analysis}
                      view={csvView}
                      height={GRAPH_HEIGHT}
                      playheadMs={playheadMs}
                    />
                  }
                />
              </S.LeftColumn>
              {recordsCard}
            </S.Row>

            <S.Row>
              <WifiHeatmapCard
                subtitle="같은 재생 시각의 RX 신호를 표시합니다. 수신 공백은 빈 구간으로 표시합니다."
                chart={
                  <HeatmapChart
                    analysis={selectedRecord.analysis}
                    view={csvView}
                    height={HEATMAP_HEIGHT}
                    playheadMs={playheadMs}
                  />
                }
              />
            </S.Row>
          </>
        )}

        {mode === "csv" && !selectedRecord && (
          <>
            <CsvEmptyToolbar loading={samplesLoading} onUpload={() => setModal({ type: "upload" })} />

            <S.Row $mt={32}>
              <S.LeftColumn>
                <ObservationSummary timeLabel="기록 시간" timeValue="—" eventsLabel="감지된 활동 사건" eventsValue="—" />
                <MovementGraphCard subtitle="선택한 기록 시간의 분석 결과입니다." showGapNote />
              </S.LeftColumn>
              {recordsCard}
            </S.Row>

            <S.Row>
              <WifiHeatmapCard subtitle="시간에 따른 Wi-Fi CSI 신호 변화를 히트맵으로 확인할 수 있습니다." />
            </S.Row>
          </>
        )}
      </S.Board>

      {renderModal()}
    </S.Page>
  );
}
