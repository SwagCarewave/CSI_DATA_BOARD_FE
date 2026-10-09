// src/components/NightMovement/CsvToolbar.tsx

import { useCallback, useState } from "react";

import * as S from "../../styles/NightMovement/CsvControls";
import * as M from "../../styles/NightMovement/Menu";
import { Button, Icon, SelectTrigger } from "../../styles/NightMovement/tokens";
import type { CsvRecord } from "../../data/nightMovement";
import { formatRecordRange } from "../../utils/nightMovementFormat";
import { useDismiss } from "./useDismiss";

import chevronDownIcon from "../../assets/NightMovement/chevronDown.svg";

interface CsvToolbarProps {
  records: CsvRecord[];
  selected: CsvRecord;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpload: () => void;
}

export default function CsvToolbar({ records, selected, onSelect, onDelete, onUpload }: CsvToolbarProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss<HTMLDivElement>(open, close);

  return (
    <S.Toolbar aria-label="CSV 조회 도구">
      <S.ToolbarTitle id="csv-file-label">등록된 파일</S.ToolbarTitle>

      <S.FileSelect ref={ref}>
        <SelectTrigger
          type="button"
          $width={450}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="csv-file-label"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selected.name}
          <Icon src={chevronDownIcon} alt="" width={16} height={16} />
        </SelectTrigger>

        {open && (
          <M.Popover>
            <M.FileMenu>
              <M.MenuLabel>등록된 파일</M.MenuLabel>
              <M.FileList role="listbox" aria-label="등록된 파일">
                {records.map((record) => {
                  const isSelected = record.id === selected.id;
                  return (
                    <M.FileOption key={record.id} $selected={isSelected}>
                      <M.FileName
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        $selected={isSelected}
                        onClick={() => {
                          onSelect(record.id);
                          close();
                        }}
                      >
                        {record.name}
                      </M.FileName>
                      <M.DeleteButton
                        type="button"
                        aria-label={`${record.name} 삭제`}
                        onClick={() => {
                          onDelete(record.id);
                          if (records.length === 1) close();
                        }}
                      >
                        삭제
                      </M.DeleteButton>
                    </M.FileOption>
                  );
                })}
              </M.FileList>
              <M.FileHint>삭제하면 목록에서 바로 제거됩니다.</M.FileHint>
            </M.FileMenu>
          </M.Popover>
        )}
      </S.FileSelect>

      <S.ToolbarDivider $ml={38} />
      <S.RecordTime>
        <S.RecordTimeLabel>기록 시간</S.RecordTimeLabel>
        <S.RecordTimeValue>{formatRecordRange(selected.start, selected.end)}</S.RecordTimeValue>
      </S.RecordTime>
      <S.ToolbarDivider $ml={0} />

      <S.UploadSlot>
        <Button type="button" onClick={onUpload}>
          CSV 업로드
        </Button>
      </S.UploadSlot>
    </S.Toolbar>
  );
}
