// src/components/monitoring/CsiGraphCard.tsx

import * as S from "../../styles/monitoring/CsiGraphCard";

export default function CsiGraphCard() {
  return (
    <S.Card>
      <S.GraphArea>
        <S.Header>
          <div>
            <S.Title>CSI 실시간 그래프</S.Title>
            <S.SubTitle>(Subcarrier Amplitude)</S.SubTitle>
          </div>

          <S.SelectButton>최근 100샘플⌄</S.SelectButton>
        </S.Header>

        <S.Legend>
          <span>━ Subcarrier 1</span>
          <span>━ Subcarrier 2</span>
          <span>━ Subcarrier 3</span>
          <span>--- 호흡 신호 (0.1~0.5Hz)</span>
        </S.Legend>

        <S.GraphPlaceholder>
          <S.LineOne />
          <S.LineTwo />
          <S.LineThree />
          <S.LineFour />
        </S.GraphPlaceholder>
      </S.GraphArea>

      <S.BioSignalBox>
        <S.BioTitle>생체신호 <span>(보조 지표)</span></S.BioTitle>

        <S.BioCard>
          <S.BioLabel>호흡수</S.BioLabel>
          <S.BioValue>16 <span>회/분</span></S.BioValue>
        </S.BioCard>

        <S.BioCard>
          <S.BioLabel>심박수</S.BioLabel>
          <S.BioValue>72 <span>BPM</span></S.BioValue>
        </S.BioCard>

        <S.Note>
          * 참고용 추정치이며
          <br />
          의료적 진단을 대체하지 않습니다.
        </S.Note>
      </S.BioSignalBox>
    </S.Card>
  );
}