// src/components/NightMovement/RangeSelect.tsx

import { useCallback, useState } from "react";

import * as M from "../../styles/NightMovement/Menu";
import { Button, Icon, SelectTrigger } from "../../styles/NightMovement/tokens";
import { graphRangeOptions } from "../../data/nightMovement";
import type { GraphRange } from "../../data/nightMovement";
import { useDismiss } from "./useDismiss";

import chevronDownIcon from "../../assets/NightMovement/chevronDown.svg";

interface RangeSelectProps {
  value: GraphRange;
  onChange: (value: GraphRange) => void;
  // select: 실시간 화면의 드롭다운 / button: CSV 화면의 "범위 선택" 버튼
  variant?: "select" | "button";
}

export default function RangeSelect({ value, onChange, variant = "select" }: RangeSelectProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss<HTMLDivElement>(open, close);

  // 실시간 화면은 최근 N분만, CSV 화면은 전체 기록도 선택할 수 있다
  const options = variant === "select" ? graphRangeOptions.filter((option) => option.value !== "all") : graphRangeOptions;
  const selected = graphRangeOptions.find((option) => option.value === value);

  return (
    <M.Anchor ref={ref}>
      {variant === "select" ? (
        <SelectTrigger
          type="button"
          $width={165}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {selected?.label}
          <Icon src={chevronDownIcon} alt="" width={16} height={16} />
        </SelectTrigger>
      ) : (
        <Button
          type="button"
          $variant="secondary"
          $width={110}
          $height={36}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {value === "all" ? "범위 선택" : selected?.label}
        </Button>
      )}

      {open && (
        <M.Popover $align="right" $tabletAlign="left">
          <M.RangeMenu role="listbox" aria-label="그래프 표시 범위">
            <M.MenuLabel>{variant === "select" ? "실시간 그래프 범위" : "그래프 표시 범위"}</M.MenuLabel>
            {options.map((option) => (
              <M.RangeOption
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                $selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  close();
                }}
              >
                {option.label}
                {option.value === value && <M.Check>✓</M.Check>}
              </M.RangeOption>
            ))}
          </M.RangeMenu>
        </M.Popover>
      )}
    </M.Anchor>
  );
}
