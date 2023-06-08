import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/modalState";
import { useHideModal } from "../hooks/modalHook";
import "./modal.scss";

type ModalProps = {
  children?: ReactNode;
};

function Modal({ children }: ModalProps) {
  const [modal] = useRecoilState(modalState);
  const hideModal = useHideModal();
  const handleCloseClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    hideModal(e.currentTarget);
  };
  return (
    <div
      className={`modal ${
        modal.show === null ? "" : modal.show ? "show" : "hide"
      }`}
    >
      <div
        className="modal-bg"
        style={{ transformOrigin: `${modal.pos.x}px ${modal.pos.y}px` }}
      ></div>
      <div className="modal-layout">
        <button className='modal-close' onClick={handleCloseClick}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-form">
          <div className="modal-title">
            <div className="title">{modal.title}</div>
          </div>
          <div className="modal-content">{modal.content}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
