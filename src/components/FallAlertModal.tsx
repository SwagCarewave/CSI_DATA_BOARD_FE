import { useEffect } from "react";
import * as S from "../styles/FallAlertModal";

interface FallAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FallAlertModal({ isOpen, onClose }: FallAlertModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.ModalBox>
        <S.WarningIcon />

        <S.Message>낙상이 감지되었습니다.</S.Message>

        <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
      </S.ModalBox>
    </S.Overlay>
  );
}