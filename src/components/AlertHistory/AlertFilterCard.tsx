import downloadIcon from "../../assets/Alert/download.svg";

import * as S from "../../styles/AlertHistory/AlertFilterCard";

export default function AlertFilterCard() {
  return (
    <S.Card>
      <S.CardTitle>필터 검색</S.CardTitle>

      <S.FilterGrid>
        <S.FilterGroup>
          <S.Label>기간 선택</S.Label>

          <S.DateInput
            type="date"
            defaultValue="2025-05-14"
            aria-label="검색 시작일"
          />

          <S.DateInput
            type="date"
            defaultValue="2025-05-21"
            aria-label="검색 종료일"
          />
        </S.FilterGroup>

        <S.FilterGroup>
          <S.Label>이벤트 유형</S.Label>

          <S.CheckLabel $color="danger">
            <input type="checkbox" defaultChecked />
            <span>낙상 감지</span>
          </S.CheckLabel>

          <S.CheckLabel $color="warning">
            <input type="checkbox" defaultChecked />
            <span>이상 호흡</span>
          </S.CheckLabel>

          <S.CheckLabel $color="purple">
            <input type="checkbox" defaultChecked />
            <span>이상탐지 사전경고</span>
          </S.CheckLabel>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.Label>확인 상태</S.Label>

          <S.RadioLabel>
            <input type="radio" name="status" defaultChecked />
            <span>전체</span>
          </S.RadioLabel>

          <S.RadioLabel>
            <input type="radio" name="status" />
            <span>미확인</span>
          </S.RadioLabel>

          <S.RadioLabel>
            <input type="radio" name="status" />
            <span>확인 완료</span>
          </S.RadioLabel>
        </S.FilterGroup>

        <S.ButtonArea>
          <S.ExportButton type="button">
            <img src={downloadIcon} alt="" />
            CSV 내보내기
          </S.ExportButton>
        </S.ButtonArea>
      </S.FilterGrid>
    </S.Card>
  );
}
