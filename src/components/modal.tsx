import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/modalState";
import "./modal.scss";
import { useHideModal } from "../hooks/modalHook";

type ModalProps = {
  children?: ReactNode;
};

function Modal({ children }: ModalProps) {
  const [modal] = useRecoilState(modalState);
  const hideModal = useHideModal();
  const handleCloseClick = () => {
    hideModal();
  };
  return (
    <div className={`modal ${modal.show ? "show" : "hide"}`}>
      <div className="modal-bg" onClick={handleCloseClick}></div>
      <div className="modal-layout">
        <div className="modal-title">
          <div className="title">{modal.title}</div>
          <button onClick={handleCloseClick}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-content">{modal.content}</div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
