import * as S from "../../styles/Settings/NotificationConfirmModal";
import { useModalFocusTrap } from "./useModalFocusTrap";

interface NotificationConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function NotificationConfirmModal({
  onCancel,
  onConfirm,
}: NotificationConfirmModalProps) {
  const modalRef = useModalFocusTrap<HTMLDivElement>();

  return (
    <S.Overlay onClick={onCancel}>
      <S.ModalBox
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="브라우저 알림 활성화 확인"
        onClick={(e) => e.stopPropagation()}
      >
        <S.Message>
          브라우저 알림이 꺼져 있습니다.
          <br />
          알림을 켜시겠습니까?
        </S.Message>

        <S.ButtonRow>
          <S.CancelButton type="button" onClick={onCancel}>
            취소
          </S.CancelButton>

          <S.ConfirmButton type="button" onClick={onConfirm}>
            켜기
          </S.ConfirmButton>
        </S.ButtonRow>
      </S.ModalBox>
    </S.Overlay>
  );
}
