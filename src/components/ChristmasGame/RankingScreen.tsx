// src/components/ChristmasGame/RankingScreen.tsx

// 전체 랭킹 화면: 트리 오너먼트 1~10등 아래에 이름·기록, "전체 랭킹 확인" → 팝업(스크롤, 바깥 누르면 닫힘)

import { useEffect, useState } from "react";
import styled from "styled-components";

import type { RankedMazeRecord } from "../../api/types";
import { ImageButton, Picture, Text, at, gameColors } from "../../styles/ChristmasGame/common";
import { images, rankBoardImage } from "./assets";
import { TREE_LIMIT, recordTime, useMazeRecords } from "./rankings";

// 배경 트리 오너먼트(1~10등) 가운데 좌표 (1215 × 820 기준)
const ORNAMENTS: [number, number][] = [
  [607, 135],
  [533, 256],
  [688, 256],
  [475, 382],
  [609, 382],
  [737, 382],
  [433, 493],
  [551, 493],
  [666, 493],
  [783, 493],
];
const LABEL_GAP = 30; // 오너먼트 가운데에서 이름까지

interface RankingScreenProps {
  highlightId: string | null; // 방금 저장한 기록
  onBack: () => void;
}

export default function RankingScreen({ highlightId, onBack }: RankingScreenProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const top = useMazeRecords(TREE_LIMIT);

  return (
    <>
      <Picture src={images.rankingBackground} alt="" style={at(0, 0, 1215, 820)} />

      {top.records?.map((record, i) => {
        const [x, y] = ORNAMENTS[i];
        return (
          <TreeLabel key={record.id} style={{ left: x - 60, top: y + LABEL_GAP }} $mine={record.id === highlightId}>
            <span>{record.name}</span>
            <span>{recordTime(record)}</span>
          </TreeLabel>
        );
      })}
      {top.error && <Notice role="alert">{top.error}</Notice>}

      <ImageButton type="button" style={at(14, 13, 158, 129)} onClick={onBack} aria-label="로비 화면으로 돌아가기">
        <img src={images.backButton} alt="" />
      </ImageButton>

      {/* 배경 그림에 그려진 버튼 위에 누를 영역을 겹친다 */}
      <BakedButton type="button" style={at(493, 711, 229, 69)} onClick={() => setPopupOpen(true)} aria-haspopup="dialog">
        전체 랭킹 확인
      </BakedButton>

      {popupOpen && <RankingPopup highlightId={highlightId} onClose={() => setPopupOpen(false)} />}
    </>
  );
}

// 팝업을 열 때마다 전체 기록을 새로 받는다
function RankingPopup({ highlightId, onClose }: { highlightId: string | null; onClose: () => void }) {
  const all = useMazeRecords();

  // Esc로도 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <Dialog role="dialog" aria-modal="true" aria-label="전체 랭킹" onClick={(e) => e.stopPropagation()}>
        <Picture src={images.rankingPopup} alt="" style={at(0, 0, 606, 808)} />
        <Text $size={32} $color={gameColors.wine} style={{ ...at(0, 90, 606), textAlign: "center" }}>
          랭킹
        </Text>
        <List>
          {all.loading && <Empty>불러오는 중이에요</Empty>}
          {all.error && <Empty role="alert">{all.error}</Empty>}
          {all.records?.length === 0 && <Empty>아직 기록이 없어요</Empty>}
          {all.records?.map((record) => (
            <RankRow key={record.id} record={record} mine={record.id === highlightId} />
          ))}
        </List>
      </Dialog>
    </Backdrop>
  );
}

function RankRow({ record, mine }: { record: RankedMazeRecord; mine: boolean }) {
  return (
    <Board $mine={mine}>
      <img src={rankBoardImage(record.rank)} alt="" />
      <Rank>{record.rank}</Rank>
      <BoardName>{record.name}</BoardName>
      <BoardTime>{recordTime(record)}</BoardTime>
    </Board>
  );
}

// 글자에 흰색 외곽선 (기획 요청)
const outlined = `
  -webkit-text-stroke: 4px #ffffff;
  paint-order: stroke fill;
`;

const TreeLabel = styled.p<{ $mine: boolean }>`
  position: absolute;
  width: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ $mine }) => ($mine ? "#ffe066" : "#ffffff")};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  text-shadow:
    0 0 3px #3a0a0a,
    0 1px 2px #3a0a0a;
  pointer-events: none;

  & > span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Notice = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  top: 640px;

  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 0 4px #3a0a0a;
`;

const BakedButton = styled.button`
  position: absolute;
  border-radius: 22px;

  color: transparent;
  font-size: 1px;

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    background-color: rgba(40, 0, 0, 0.14);
    box-shadow: 0 0 18px 4px rgba(255, 214, 120, 0.75);
  }

  &:active {
    background-color: rgba(40, 0, 0, 0.26);
    box-shadow: 0 0 22px 6px rgba(255, 196, 90, 0.9);
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 3px solid #ffe28a;
    outline-offset: 2px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;
  background-color: rgba(8, 4, 20, 0.55);
`;

const Dialog = styled.div`
  position: absolute;
  left: 305px;
  top: 6px;
  width: 606px;
  height: 808px;
`;

// 팝업 안 크림색 판 영역
const List = styled.div`
  position: absolute;
  left: 82px;
  top: 186px;
  width: 442px;
  height: 494px;
  padding: 0 4px;

  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #c9867a transparent;
`;

const Empty = styled.p`
  margin-top: 40px;
  color: ${gameColors.wine};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

// 판 그림(2172 × 724)의 위아래 투명 여백을 겹쳐 줄 간격을 줄인다
const Board = styled.div<{ $mine: boolean }>`
  position: relative;
  height: 102px;
  margin-bottom: -6px;

  color: ${gameColors.wine};
  font-weight: 700;
  ${({ $mine }) => $mine && "filter: drop-shadow(0 0 8px rgba(255, 210, 90, 0.95));"}

  & > img {
    position: absolute;
    left: 0;
    top: -18px;
    width: 100%;
    height: auto;
    pointer-events: none;
  }
`;

const Rank = styled.span`
  position: absolute;
  left: 14.7%;
  top: 46%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  ${outlined}
`;

const BoardName = styled.span`
  position: absolute;
  left: 30%;
  top: 46%;
  width: 34%;
  transform: translateY(-50%);
  overflow: hidden;
  font-size: 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${outlined}
`;

const BoardTime = styled.span`
  position: absolute;
  left: 66%;
  top: 46%;
  width: 22%;
  transform: translateY(-50%);
  font-size: 20px;
  text-align: center;
  ${outlined}
`;
