// src/pages/NightMovementDashboardPage.tsx

import { useMemo, useRef, useState } from "react";

import * as S from "../styles/NightMovement/NightMovementDashboardPage";
import { Button } from "../styles/NightMovement/tokens";

import DashboardHeader from "../components/NightMovement/DashboardHeader";
import type { DashboardMode } from "../components/NightMovement/DashboardHeader";
import RealtimeControlBar from "../components/NightMovement/RealtimeControlBar";
import ObservationSummary from "../components/NightMovement/ObservationSummary";
import MovementGraphCard from "../components/NightMovement/MovementGraphCard";
import WifiHeatmapCard from "../components/NightMovement/WifiHeatmapCard";
import MovementChart from "../components/NightMovement/MovementChart";
import HeatmapChart from "../components/NightMovement/HeatmapChart";
import MazeDirection from "../components/NightMovement/MazeDirection";
import ActivityRecordsCard from "../components/NightMovement/ActivityRecordsCard";
import RangeSelect from "../components/NightMovement/RangeSelect";
import CsvToolbar from "../components/NightMovement/CsvToolbar";
import CsvEmptyToolbar from "../components/NightMovement/CsvEmptyToolbar";
import CsvPlayback from "../components/NightMovement/CsvPlayback";
import CsvAnalysisNotice from "../components/NightMovement/CsvAnalysisNotice";
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

import { confirmEvent } from "../api/carewave";
import { errorMessage } from "../api/client";
import type { CsvFile } from "../api/types";
import { defaultReceivers, graphRangeOptions, resultToGuardian, rxStatusToState } from "../data/nightMovement";
import type { GraphRange } from "../data/nightMovement";
import { useCsvFiles } from "../hooks/useCsvFiles";
import { useLiveSession } from "../hooks/useLiveSession";
import { useNow } from "../hooks/useNow";
import { useRecording } from "../hooks/useRecording";
import { useReplay } from "../hooks/useReplay";
import { formatClock } from "../utils/chartScale";
import { SCROLLBAR_SPACE } from "../utils/chartScale";
import type { ChartScroll, TimeView } from "../utils/chartScale";
import {
  isMovingNow,
  lastActiveByEvent,
  markersFromEvents,
  toActivityEvent,
  toCsvRecord,
} from "../utils/signalSeries";
import { formatDuration } from "../utils/nightMovementFormat";

const GRAPH_HEIGHT = 250;
const HEATMAP_HEIGHT = 138;
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

type ModalState =
  | { type: "none" }
  | { type: "allRecords"; tab: RecordTab }
  | { type: "detail"; eventId: string }
  | { type: "result"; eventId: string }
  | { type: "saved" }
  | { type: "upload" }
  | { type: "uploadConfirm"; file: CsvFile }
  | { type: "fileError"; message?: string }
  | { type: "analyzing"; file: CsvFile }
  | { type: "analysisFailed"; file: CsvFile; message: string };

const rangeSeconds = (range: GraphRange) => graphRangeOptions.find((option) => option.value === range)?.seconds ?? 600;

// CSV: 재생 위치를 가운데에 두고 선택한 기간만큼 (기록 범위를 넘지 않게)
const playbackView = (record: TimeView, range: GraphRange, playheadMs: number): TimeView => {
  const length = rangeSeconds(range) * 1000;
  if (length >= record.endMs - record.startMs) return record;
  const startMs = Math.min(Math.max(record.startMs, playheadMs - length / 2), record.endMs - length);
  return { startMs, endMs: startMs + length };
};

// 실시간: 한 화면에 보이는 시간. 새 신호가 오면 옛 구간은 왼쪽으로 밀려나고, 스크롤로 다시 볼 수 있다
const LIVE_WINDOW_MS = 60 * 1000;
// 오른쪽 끝에서 이만큼 안쪽이면 최신을 따라가는 것으로 본다
const FOLLOW_SLACK_MS = 500;

// anchorEndMs가 없으면 최신 구간, 있으면 그 시각에서 끝나는 구간 (기록 범위 안으로 맞춤)
const slidingView = (total: TimeView, length: number, anchorEndMs: number | null): TimeView => {
  if (total.endMs - total.startMs <= length) return { startMs: total.startMs, endMs: total.startMs + length };
  const endMs = Math.min(total.endMs, Math.max(total.startMs + length, anchorEndMs ?? total.endMs));
  return { startMs: endMs - length, endMs };
};

const formatAgo = (seconds: number | null) => {
  if (seconds === null) return "—";
  if (seconds < 60) return `${Math.max(0, Math.round(seconds))}초 전`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  return `${Math.floor(seconds / 3600)}시간 전`;
};

export default function NightMovementDashboardPage() {
  const [mode, setMode] = useState<DashboardMode>("realtime");
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [notice, setNotice] = useState<string | null>(null);
  const [realtimeRange, setRealtimeRange] = useState<GraphRange>("10m");
  // 실시간 그래프를 지난 구간으로 옮겼을 때 보이는 끝 시각 (null이면 최신을 따라감)
  const [liveAnchor, setLiveAnchor] = useState<{ sessionId: string; endMs: number } | null>(null);
  const [csvRange, setCsvRange] = useState<GraphRange>("all");
  const [uploading, setUploading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const analysisCancel = useRef({ current: false });
  const now = useNow();

  const live = useLiveSession(rangeSeconds(realtimeRange));
  const recording = useRecording(live.session, now);
  const csv = useCsvFiles();

  const selectedFile = csv.selected;
  const recordStart = selectedFile ? selectedFile.record_start * 1000 : 0;
  const recordEnd = selectedFile ? selectedFile.record_end * 1000 : 0;
  const recordView = useMemo(
    () => (selectedFile ? { startMs: recordStart, endMs: recordEnd } : null),
    [selectedFile, recordStart, recordEnd],
  );
  const replay = useReplay(csv.result?.analysisId ?? null, recordView);

  const apiEvents = mode === "realtime" ? live.events : (csv.result?.events ?? null);
  // 실시간 사건은 보호자 확인 전까지 열려 있으므로, "진행 중" 여부는 최근 판정 상태로 정한다
  const liveMovingNow = isMovingNow(live.series);
  const currentEvents = useMemo(() => {
    if (!apiEvents) return null;
    if (mode !== "realtime") return apiEvents.map((event) => toActivityEvent(event));
    const lastActive = lastActiveByEvent(live.series);
    const currentEventId = live.series?.eventId.findLast((id) => id !== null) ?? null;
    return apiEvents.map((event) =>
      toActivityEvent(event, {
        movingNow: liveMovingNow && currentEventId === event.number,
        lastActiveMs: lastActive.get(event.number),
      }),
    );
  }, [apiEvents, mode, live.series, liveMovingNow]);
  const closeModal = () => setModal({ type: "none" });

  /* 실시간 */
  const session = live.session;
  const running = session?.status === "running";
  const liveSeries = live.series;
  const liveEndMs = liveSeries?.ts.at(-1) ?? (session ? (session.last_packet_at ?? session.started_at) * 1000 : now);
  // 쌓인 기록 전체 (선택한 기간만큼) 중 LIVE_WINDOW_MS만 보여 준다
  const liveTotal: TimeView = {
    startMs: session ? Math.max(session.started_at * 1000, liveEndMs - rangeSeconds(realtimeRange) * 1000) : liveEndMs,
    endMs: liveEndMs,
  };
  const liveAnchorEnd = session && liveAnchor?.sessionId === session.id ? liveAnchor.endMs : null;
  const liveView = slidingView(liveTotal, LIVE_WINDOW_MS, liveAnchorEnd);
  // 끌기처럼 한 프레임에 여러 번 옮겨도 놓치지 않도록 직전 위치에서 이어 계산한다
  const moveLiveView = (nextEnd: (currentEndMs: number) => number) => {
    if (!session) return;
    setLiveAnchor((prev) => {
      const current = slidingView(liveTotal, LIVE_WINDOW_MS, prev?.sessionId === session.id ? prev.endMs : null);
      const endMs = nextEnd(current.endMs);
      return endMs >= liveTotal.endMs - FOLLOW_SLACK_MS ? null : { sessionId: session.id, endMs };
    });
  };
  const liveScroll: ChartScroll = {
    total: liveTotal,
    onPan: (deltaMs) => moveLiveView((endMs) => endMs + deltaMs),
    onScrollTo: (startMs) => moveLiveView(() => startMs + LIVE_WINDOW_MS),
  };
  const liveMarkers = useMemo(() => markersFromEvents(live.events, now), [live.events, now]);
  const elapsedMs = session ? (running ? now - session.started_at * 1000 : session.elapsed_sec * 1000) : 0;
  const receivers = session?.rx.length
    ? session.rx.map((rx) => ({ device: rx.rx, state: rxStatusToState[rx.status] }))
    : defaultReceivers;
  const sinceLast = session?.seconds_since_last_packet ?? null;
  const signalCaption = !running ? (session ? "관찰 종료" : "관찰 전") : sinceLast !== null && sinceLast < 5 ? "신호 수신 중" : "수신 대기 중";

  /* CSV */
  const csvMarkers = useMemo(
    () => (csv.result ? markersFromEvents(csv.result.events, now) : []),
    [csv.result, now],
  );
  const csvView = recordView ? playbackView(recordView, csvRange, replay.positionMs) : null;

  /* 업로드 · 분석 */
  const handleFileSelected = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setModal({ type: "fileError", message: "CSV 파일(.csv)만 올릴 수 있습니다." });
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setModal({ type: "fileError", message: "파일이 50MB를 넘습니다." });
      return;
    }
    setUploading(true);
    try {
      const created = await csv.upload(file);
      setModal({ type: "uploadConfirm", file: created });
    } catch (e) {
      setModal({ type: "fileError", message: errorMessage(e) });
    } finally {
      setUploading(false);
    }
  };

  const runAnalysis = async (file: CsvFile) => {
    analysisCancel.current.current = true; // 이전 진행 표시는 멈춘다
    const cancel = { current: false };
    analysisCancel.current = cancel;
    setAnalysisProgress(0);
    setModal({ type: "analyzing", file });

    try {
      await csv.analyze(file.id, (ratio) => !cancel.current && setAnalysisProgress(ratio), cancel);
      if (cancel.current) return;
      setMode("csv");
      setModal({ type: "none" });
    } catch (e) {
      if (!cancel.current) setModal({ type: "analysisFailed", file, message: errorMessage(e) });
    }
  };

  // 진행 화면만 닫는다 (서버 분석은 계속되고, 파일 목록에 "분석 중"으로 보인다)
  const closeAnalyzing = () => {
    analysisCancel.current.current = true;
    closeModal();
    csv.refreshFiles();
  };

  const deleteRecord = (id: string) => {
    csv.remove(id).catch((e) => setNotice(errorMessage(e)));
  };

  const openEvent = (eventId: string) => setModal({ type: "detail", eventId });
  const findEvent = (id: string) => currentEvents?.find((event) => event.id === id);

  const renderModal = () => {
    switch (modal.type) {
      case "allRecords":
        return (
          <AllRecordsModal
            events={currentEvents ?? []}
            initialTab={modal.tab}
            onClose={closeModal}
            onSelectEvent={(event) => openEvent(event.id)}
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
            onSubmit={async (result) => {
              const updated = await confirmEvent(modal.eventId, resultToGuardian(result));
              if (updated.source === "live") live.replaceEvent(updated);
              else csv.replaceEvent(updated);
              setModal({ type: "saved" });
            }}
          />
        );
      case "saved":
        return <SavedModal onClose={closeModal} />;
      case "upload":
        return <UploadModal uploading={uploading} onClose={closeModal} onFileSelected={handleFileSelected} />;
      case "uploadConfirm":
        return (
          <UploadConfirmModal
            file={{
              name: modal.file.filename,
              start: new Date(modal.file.record_start * 1000),
              end: new Date(modal.file.record_end * 1000),
              receivers: modal.file.receivers,
            }}
            onClose={closeModal}
            onAnalyze={() => runAnalysis(modal.file)}
          />
        );
      case "fileError":
        return (
          <FileErrorModal message={modal.message} onClose={closeModal} onPickAnother={() => setModal({ type: "upload" })} />
        );
      case "analyzing":
        return <AnalyzingModal progress={analysisProgress} onClose={closeAnalyzing} />;
      case "analysisFailed":
        return (
          <AnalysisFailedModal
            message={modal.message}
            onClose={closeModal}
            onPickAnother={() => setModal({ type: "upload" })}
            onRetry={() => runAnalysis(modal.file)}
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
      onSelectEvent={(event) => openEvent(event.id)}
    />
  );

  // 분석 결과가 없을 때 재생 막대 자리에 보여 줄 안내
  const analysisNotice = () => {
    if (!selectedFile) return null;
    const latest = selectedFile.latest_analysis;
    if (latest?.status === "queued" || latest?.status === "running") {
      return (
        <CsvAnalysisNotice
          title="분석 중입니다."
          description={`서버에서 파일을 분석하고 있습니다 (${Math.round(latest.progress * 100)}%). 끝나면 그래프가 표시됩니다.`}
        />
      );
    }
    if (latest?.status === "succeeded") {
      return csv.resultError ? (
        <CsvAnalysisNotice title="분석 결과를 불러오지 못했습니다." description={csv.resultError} actionLabel="다시 불러오기" onAction={csv.refreshFiles} />
      ) : (
        <CsvAnalysisNotice title="분석 결과를 불러오는 중입니다." description="잠시만 기다려 주세요." />
      );
    }
    return (
      <CsvAnalysisNotice
        title={latest?.status === "failed" ? "분석하지 못한 파일입니다." : "아직 분석하지 않은 파일입니다."}
        description={latest?.error_message ?? "분석을 시작하면 움직임 그래프와 활동 사건이 표시됩니다."}
        actionLabel={latest?.status === "failed" ? "다시 시도" : "분석 시작"}
        onAction={() => runAnalysis(selectedFile)}
      />
    );
  };

  const errorText = notice ?? (mode === "realtime" ? live.error : csv.error);

  return (
    <S.Page>
      <S.Board>
        <DashboardHeader mode={mode} onModeChange={setMode} />

        {live.alert && (
          <S.Notice $tone="alert" role="alert">
            <strong>보호자 확인이 필요해요</strong>
            {/* 누운 것이 확인되면(움직임 멈춤) "이어지고 있습니다" 문구 대신 멈춤 안내 */}
            <span>
              {liveMovingNow
                ? live.alert.message
                : "움직임이 멈췄어요. 확인이 필요한 활동이 있으니 현장을 확인해 주세요."}
            </span>
            <S.NoticeActions>
              <Button
                type="button"
                $width={110}
                $height={36}
                onClick={() => {
                  setMode("realtime");
                  openEvent(live.alert!.eventId);
                }}
              >
                확인하기
              </Button>
              <Button type="button" $variant="secondary" $width={80} $height={36} onClick={live.dismissAlert}>
                닫기
              </Button>
            </S.NoticeActions>
          </S.Notice>
        )}

        {errorText && (
          <S.Notice $tone="error" role="status">
            <strong>연결 오류</strong>
            <span>{errorText}</span>
            {notice && (
              <S.NoticeActions>
                <Button type="button" $variant="secondary" $width={80} $height={36} onClick={() => setNotice(null)}>
                  닫기
                </Button>
              </S.NoticeActions>
            )}
          </S.Notice>
        )}

        {mode === "realtime" && (
          <>
            <RealtimeControlBar
              sleepMode={running}
              busy={live.loading || live.toggling}
              onSleepModeChange={live.setSleepMode}
              observationStart={session ? formatClock(session.started_at * 1000, false) : "—"}
              receivers={receivers}
              lastSignal={formatAgo(sinceLast)}
              signalCaption={signalCaption}
              csvExport={{
                enabled: recording.canDownload,
                downloading: recording.downloading,
                hint: recording.hint,
                onClick: () => {
                  setNotice(null);
                  recording.download().catch((e) => setNotice(errorMessage(e)));
                },
              }}
            />

            <MazeDirection running={running} steps={live.mazeSteps} status={live.mazeStatus} />

            <S.Row>
              <S.LeftColumn>
                <ObservationSummary
                  timeLabel="관찰 시간"
                  timeValue={session ? formatDuration(elapsedMs) : "—"}
                  timeExtra={
                    session
                      ? `${formatClock(session.started_at * 1000, false)} ~ ${
                          running || !session.stopped_at ? "진행 중" : formatClock(session.stopped_at * 1000, false)
                        }`
                      : undefined
                  }
                  eventsLabel="감지된 주요 움직임"
                  eventsValue={session ? `${live.events.length}건` : "—"}
                />
                <MovementGraphCard
                  subtitle="시간에 따른 움직임의 강도를 분석한 결과입니다."
                  action={<RangeSelect value={realtimeRange} onChange={setRealtimeRange} />}
                  chartMinWidth={0}
                  emptyText={live.loading ? "불러오는 중입니다" : "취침 모드를 켜면 관찰을 시작합니다"}
                  chart={
                    session &&
                    liveSeries && (
                      <MovementChart
                        series={liveSeries}
                        markers={liveMarkers}
                        view={liveView}
                        height={GRAPH_HEIGHT}
                        scroll={liveScroll}
                      />
                    )
                  }
                />
              </S.LeftColumn>
              {recordsCard}
            </S.Row>

            <S.Row>
              <WifiHeatmapCard
                subtitle="RX1 · RX2 · RX3 신호를 함께 표시합니다."
                chartMinWidth={0}
                emptyText={live.loading ? "불러오는 중입니다" : "취침 모드를 켜면 관찰을 시작합니다"}
                chart={
                  session &&
                  liveSeries && (
                    <HeatmapChart
                      series={liveSeries}
                      markers={liveMarkers}
                      view={liveView}
                      height={HEATMAP_HEIGHT + SCROLLBAR_SPACE}
                      scroll={liveScroll}
                    />
                  )
                }
              />
            </S.Row>
          </>
        )}

        {mode === "csv" && selectedFile && (
          <>
            <CsvToolbar
              records={csv.files.map(toCsvRecord)}
              selected={toCsvRecord(selectedFile)}
              onSelect={csv.select}
              onDelete={deleteRecord}
              onUpload={() => setModal({ type: "upload" })}
            />

            <S.Row>
              <div style={{ width: "100%" }}>
                {csv.result && replay.ready ? (
                  <CsvPlayback
                    start={new Date(recordStart)}
                    end={new Date(recordEnd)}
                    progress={replay.progress}
                    playing={replay.playing}
                    speed={replay.speed}
                    onTogglePlay={replay.togglePlay}
                    onSeek={replay.seek}
                    onSpeedChange={replay.setSpeed}
                  />
                ) : (
                  analysisNotice()
                )}
              </div>
            </S.Row>

            <S.Row>
              <S.LeftColumn>
                <ObservationSummary
                  timeLabel="기록 시간"
                  timeValue={formatDuration(recordEnd - recordStart)}
                  eventsLabel="감지된 활동 사건"
                  eventsValue={csv.result ? `${csv.result.events.length}건` : "—"}
                />
                <MovementGraphCard
                  subtitle="재생 시각에 맞춰 움직임 그래프와 CSI 히트맵이 함께 갱신됩니다."
                  action={<RangeSelect variant="button" value={csvRange} onChange={setCsvRange} />}
                  emptyText="분석 후 그래프가 표시됩니다"
                  chart={
                    csv.result &&
                    csvView && (
                      <MovementChart
                        series={csv.result.series}
                        markers={csvMarkers}
                        view={csvView}
                        height={GRAPH_HEIGHT}
                        playheadMs={replay.ready ? replay.positionMs : undefined}
                      />
                    )
                  }
                />
              </S.LeftColumn>
              {recordsCard}
            </S.Row>

            <S.Row>
              <WifiHeatmapCard
                subtitle="같은 재생 시각의 RX 신호를 표시합니다. 수신 공백은 빈 구간으로 표시합니다."
                emptyText="분석 후 히트맵이 표시됩니다"
                chart={
                  csv.result &&
                  csvView && (
                    <HeatmapChart
                      series={csv.result.series}
                      markers={csvMarkers}
                      view={csvView}
                      height={HEATMAP_HEIGHT}
                      playheadMs={replay.ready ? replay.positionMs : undefined}
                    />
                  )
                }
              />
            </S.Row>
          </>
        )}

        {mode === "csv" && !selectedFile && (
          <>
            <CsvEmptyToolbar loading={csv.loading} onUpload={() => setModal({ type: "upload" })} />

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
