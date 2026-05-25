// src/components/monitoring/SkeletonCard.tsx

import * as S from "../../styles/monitoring/SkeletonCard";

const keypoints = [
  "머리", "목", "왼쪽 어깨", "오른쪽 어깨", "왼쪽 팔꿈치",
  "오른쪽 팔꿈치", "왼쪽 손목", "오른쪽 손목", "왼쪽 골반",
  "오른쪽 골반", "왼쪽 무릎", "오른쪽 무릎", "왼쪽 발목",
  "오른쪽 발목", "왼쪽 발", "오른쪽 발", "중심점",
];

export default function SkeletonCard() {
  return (
    <S.Card>
      <S.Header>
        <S.Title>스켈레톤 시각화</S.Title>
        <S.SubTitle>(17 Keypoints)</S.SubTitle>

        <S.LiveBox>
          <S.LiveDot />
          LIVE&nbsp;&nbsp;14:32:18
        </S.LiveBox>
      </S.Header>

      <S.Body>
        <S.SkeletonView>
          <S.MotionText>
            현재 동작
            <br />
            <strong>걷기</strong>
          </S.MotionText>

          <S.PersonPlaceholder>
            스켈레톤
            <br />
            영역
          </S.PersonPlaceholder>

          <S.ControlBox>
            <S.ControlButton>⛶</S.ControlButton>
            <S.ControlButton>Ⅱ</S.ControlButton>
          </S.ControlBox>
        </S.SkeletonView>

        <S.KeypointList>
          {keypoints.map((item, index) => (
            <S.KeypointItem key={item}>
              <span>{index + 1}</span>
              {item}
            </S.KeypointItem>
          ))}
        </S.KeypointList>
      </S.Body>
    </S.Card>
  );
}