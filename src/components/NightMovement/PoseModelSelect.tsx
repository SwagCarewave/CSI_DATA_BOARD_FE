import { useCallback, useState } from "react";

import * as M from "../../styles/NightMovement/Menu";
import { Icon, SelectTrigger } from "../../styles/NightMovement/tokens";
import { listPoseModels, setActivePoseModel } from "../../api/carewave";
import { errorMessage } from "../../api/client";
import type { PoseModelItem } from "../../api/types";
import { useDismiss } from "./useDismiss";

import chevronDownIcon from "../../assets/NightMovement/chevronDown.svg";

const MODEL_LABELS: Record<string, string> = {
  csipose_tcn_v3_posture: "6대-ho",
  carewave_v3_upper_20261102: "6대-ye",
};

const modelLabel = (name: string) => MODEL_LABELS[name] ?? name;

interface PoseModelSelectProps {
  activeName: string | null;
  onSelectEsp4: () => void;
  onError: (message: string | null) => void;
}

export default function PoseModelSelect({ activeName, onSelectEsp4, onError }: PoseModelSelectProps) {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState<PoseModelItem[]>([]);
  const [switching, setSwitching] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss<HTMLDivElement>(open, close);

  const toggle = () => {
    if (!open) {
      listPoseModels()
        .then(setModels)
        .catch((e) => onError(errorMessage(e)));
    }
    setOpen((prev) => !prev);
  };

  const choose = (name: string) => {
    close();
    if (name === activeName) return;
    setSwitching(true);
    onError(null);
    setActivePoseModel(name)
      .catch((e) => onError(errorMessage(e)))
      .finally(() => setSwitching(false));
  };

  const names = models.length ? models.map((model) => model.name) : activeName ? [activeName] : [];

  return (
    <M.Anchor ref={ref}>
      <SelectTrigger
        type="button"
        $width={104}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="스켈레톤 모델 선택"
        disabled={switching}
        onClick={toggle}
      >
        {switching ? "바꾸는 중" : activeName ? modelLabel(activeName) : "—"}
        <Icon src={chevronDownIcon} alt="" width={16} height={16} />
      </SelectTrigger>

      {open && (
        <M.Popover $align="right">
          <M.RangeMenu role="listbox" aria-label="스켈레톤 모델">
            <M.MenuLabel>스켈레톤 모델</M.MenuLabel>
            <M.RangeOption
              type="button"
              role="option"
              aria-selected={false}
              $selected={false}
              onClick={() => {
                close();
                onSelectEsp4();
              }}
            >
              esp 4대
            </M.RangeOption>
            {names.map((name) => (
              <M.RangeOption
                key={name}
                type="button"
                role="option"
                aria-selected={name === activeName}
                $selected={name === activeName}
                onClick={() => choose(name)}
              >
                {modelLabel(name)}
                {name === activeName && <M.Check>✓</M.Check>}
              </M.RangeOption>
            ))}
          </M.RangeMenu>
        </M.Popover>
      )}
    </M.Anchor>
  );
}
