// src/components/ChristmasGame/HowToScreen.tsx

// 게임 방법 (2쪽): 1쪽 출발지·도착지·방향 기준, 2쪽 지팡이 사탕 화살표 규칙

import styled from "styled-components";

import { FlippedImage, ImageButton, Picture, Text, at, gameColors } from "../../styles/ChristmasGame/common";
import { images } from "./assets";
import CandyCane from "./CandyCane";
import type { CaneArrow } from "./CandyCane";
import ModelPicker from "./ModelPicker";

interface HowToScreenProps {
  page: 1 | 2;
  onBack: () => void;
  onNext: () => void;
}

export default function HowToScreen({ page, onBack, onNext }: HowToScreenProps) {
  return (
    <>
      <Picture src={images.lobbyBackground} alt="" style={at(0, 0, 1215, 820)} />
      <Wash />
      {page === 1 ? <PageOne /> : <PageTwo />}

      <ImageButton
        type="button"
        style={at(36, 54, 140, 114)}
        onClick={onBack}
        aria-label={page === 1 ? "로비로 돌아가기" : "이전 게임 방법"}
      >
        <img src={images.backButton} alt="" />
      </ImageButton>
      {page === 1 && (
        <ImageButton type="button" style={at(1060, 58, 140, 114)} onClick={onNext} aria-label="다음 게임 방법">
          <FlippedImage src={images.backButton} alt="" />
        </ImageButton>
      )}
    </>
  );
}

function PageOne() {
  return (
    <>
      <Panel style={at(445, 93, 687, 619)} />

      <Preview src={images.howToStart} alt="출발지: 왼쪽 아래 첫 칸" style={at(69, 119, 283, 229)} $shadow />
      <Text $size={32} style={{ ...at(110, 367, 200), textAlign: "center" }}>
        출발지
      </Text>
      <Preview src={images.howToGoal} alt="도착지: 오른쪽 위 집" style={at(76, 429, 283, 242)} />
      <Text $size={32} style={{ ...at(110, 690, 200), textAlign: "center" }}>
        도착지
      </Text>

      <Text $size={32} style={{ ...at(445, 115, 687), textAlign: "center" }}>
        esp를 이용해 <Regular>캐릭터를 움직이고,</Regular>
        <br />
        아이에게 <Colored $color={gameColors.red}>선물</Colored>을 가져다 주면{" "}
        <Colored $color={gameColors.green}>게임 클리어</Colored>!
      </Text>

      <Text $size={24} $color={gameColors.brown} style={{ ...at(543, 278, 149), textAlign: "center" }}>
        상: 0.0~0.2
        <br />
        좌: 0.2~0.8
        <br />
        우: 0.8~1.0
      </Text>

      {/* 시안 예시 그대로 (말풍선 화살표와 출력값 위치) */}
      <ModelPicker left={608} top={223} width={468} value={0.3} direction="up" />

      <Text $size={24} $color={gameColors.brown} style={{ ...at(445, 601, 687), textAlign: "center" }}>
        TIP!
        <br />
        esp 안에서 조심히 움직이면 출력값이 낮게 나오고
        <br />
        역동적으로 움직이면 높게 나옵니다
      </Text>
    </>
  );
}

function PageTwo() {
  return (
    <>
      <Panel style={at(36, 81, 1140, 667)} />

      <Rules $size={24} style={at(77, 192, 767)}>
        <span>
          ① 모델 출력값<Regular>으로 정해진</Regular> 화살표<Regular>가 지팡이</Regular> <Mark>맨 아래 칸</Mark>
          <Regular>에 들어가요.</Regular>
        </span>
        <br />
        <br />
        <span>
          ② 새 화살표가 <Regular>들어올 때마다 위에 있던</Regular>
        </span>
        <br />
        <span>
          {"   "}
          <Regular>화살표들이 한 칸씩</Regular> <Colored $color={gameColors.red}>밀려 사라져요.</Colored>
        </span>
        <br />
        <br />
        <span>
          ③ 2초마다<Regular> 몸통 맨 위 화살표가 </Regular>갈고리<Regular>로 넘어가요.</Regular>
        </span>
        <br />
        <br />
        <span>
          ④ <Mark>갈고리</Mark>에 도착한 화살표 방향으로 <Colored $color={gameColors.leaf}>캐릭터가 한 칸 움직여요!</Colored>
        </span>
        <br />
        <Regular>(오로지 갈고리에 도착한 화살표만 인식되기 때문에</Regular>
        <br />
        <span>
          <Regular>가고자 하는 방향으로 </Regular>많은 화살표를 만들어야 해요!<Regular>)</Regular>
        </span>
        <br />
        <br />
        <Colored $color={gameColors.alert}>※ 주의!</Colored>
        <Caution>
          동일한 동작이 <Regular>2초 동안 이어지면</Regular>
          <br />
          동일하게 생긴 화살표가 <Regular>하나 더 생성됩니다.</Regular>
          <br />
          단, <Regular>2초가 되지 않았더라도 </Regular>새로운 임계값에 도달하면
          <br />
          <Regular>해당하는 </Regular>화살표가 곧바로 생성됩니다.
        </Caution>
      </Rules>

      {/* 안내선: 맨 아래 칸 → 설명 ①, 갈고리 → 설명 ④ */}
      <Guide style={at(620, 144, 215, 7)} />
      <Guide style={at(828, 144, 7, 426)} />
      <Guide style={at(828, 563, 40, 7)} />
      <GuideArrow style={at(610, 150)} />

      <CandyCane left={835} top={111} width={309} arrows={exampleArrows} />
      {/* 갈고리 → 설명 ④: 왼쪽으로 가다 아래로 꺾여 "캐릭터가 한 칸 움직여요!"를 가리킨다 (지팡이 위로 지나감) */}
      <Guide style={at(711, 302, 302, 7)} />
      <Guide style={at(711, 302, 7, 72)} />
      <GuideArrow style={at(701, 372)} />
      <Callout style={at(1010, 245, 115, 113)} />
      <Callout style={at(865, 516, 115, 113)} />
    </>
  );
}

// 2쪽 예시: 몸통 위→아래 (오래된 것 → 새것), 갈고리
const exampleArrows: CaneArrow[] = [
  { id: 1, direction: "right", place: { slot: 0 } },
  { id: 2, direction: "right", place: { slot: 1 } },
  { id: 3, direction: "left", place: { slot: 2 } },
  { id: 4, direction: "up", place: { slot: 3 } },
  { id: 5, direction: "up", place: "hook" },
];

const Wash = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.33);
`;

const Panel = styled.div`
  position: absolute;
  border-radius: 34px;
  background-color: ${gameColors.panel};
  box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Preview = styled(Picture)<{ $shadow?: boolean }>`
  object-fit: cover;
  border-radius: 34px;
  box-shadow: ${({ $shadow }) => ($shadow ? "0 4px 18.4px 6px rgba(0, 0, 0, 0.25)" : "none")};
`;

const Regular = styled.span`
  font-weight: 400;
`;

const Colored = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const Mark = styled.mark`
  background-color: ${gameColors.highlight};
  color: inherit;
`;

const Rules = styled(Text)`
  white-space: pre;
`;

const Caution = styled.span`
  display: block;
  color: ${gameColors.brown};
`;

const Guide = styled.div`
  position: absolute;
  background-color: ${gameColors.red};
`;

const GuideArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-top: 30px solid ${gameColors.red};
`;

const Callout = styled.div`
  position: absolute;
  z-index: 4;
  border: 9px solid ${gameColors.red};
`;
