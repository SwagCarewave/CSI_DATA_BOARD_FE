// src/components/NightMovement/CsvEmptyToolbar.tsx

import * as S from "../../styles/NightMovement/CsvControls";
import { Button } from "../../styles/NightMovement/tokens";

interface CsvEmptyToolbarProps {
  // 예시 CSV를 분석하는 중
  loading?: boolean;
  onUpload: () => void;
}

export default function CsvEmptyToolbar({ loading = false, onUpload }: CsvEmptyToolbarProps) {
  return (
    <S.EmptyToolbar aria-label="CSV 조회 도구" aria-busy={loading}>
      <S.EmptyTitle>{loading ? "CSV 파일을 불러오는 중입니다." : "등록된 CSV 파일이 없습니다."}</S.EmptyTitle>
      <S.EmptyDescription>
        {loading
          ? "예시 기록을 분석하고 있습니다. 잠시만 기다려 주세요."
          : "파일을 업로드하면 과거 움직임과 감지 내역을 확인할 수 있습니다."}
      </S.EmptyDescription>
      <Button type="button" onClick={onUpload}>
        CSV 업로드
      </Button>
    </S.EmptyToolbar>
  );
}
