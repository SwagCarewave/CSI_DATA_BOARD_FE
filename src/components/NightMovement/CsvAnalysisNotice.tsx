// src/components/NightMovement/CsvAnalysisNotice.tsx

// 선택한 파일의 분석 결과가 아직 없을 때 재생 막대 자리에 보여 준다

import * as S from "../../styles/NightMovement/CsvControls";
import { Button } from "../../styles/NightMovement/tokens";

interface CsvAnalysisNoticeProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function CsvAnalysisNotice({ title, description, actionLabel, onAction }: CsvAnalysisNoticeProps) {
  return (
    <S.EmptyToolbar aria-live="polite">
      <S.EmptyTitle>{title}</S.EmptyTitle>
      <S.EmptyDescription>{description}</S.EmptyDescription>
      {actionLabel && onAction && (
        <Button type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </S.EmptyToolbar>
  );
}
