// src/components/NightMovement/Modal.tsx

import { useEffect, useId } from "react";
import type { ReactNode } from "react";

import * as S from "../../styles/NightMovement/Modal";
import { Icon } from "../../styles/NightMovement/tokens";
import { useModalFocusTrap } from "../Settings/useModalFocusTrap";

import closeIcon from "../../assets/NightMovement/close.svg";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  // Figma 프레임별 하단 여백
  paddingBottom: number;
  paddingTop?: number;
  radius?: number;
  largeTitle?: boolean;
}

export default function Modal({
  title,
  onClose,
  children,
  paddingBottom,
  paddingTop = 19,
  radius = 10,
  largeTitle = false,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useModalFocusTrap<HTMLDivElement>();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <S.Overlay
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <S.Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        $pt={paddingTop}
        $pb={paddingBottom}
        $radius={radius}
      >
        <S.Header $align={largeTitle ? "center" : "flex-start"}>
          <S.Title id={titleId} $large={largeTitle}>
            {title}
          </S.Title>
          <S.CloseButton type="button" aria-label="닫기" onClick={onClose}>
            <Icon src={closeIcon} alt="" width={16} height={16} />
          </S.CloseButton>
        </S.Header>

        {children}
      </S.Dialog>
    </S.Overlay>
  );
}
