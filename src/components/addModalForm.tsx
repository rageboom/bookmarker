import { useRef } from "react";
import { useAddBoard } from "../hooks/boardHook";
import { useHideModal } from "../hooks/modalHook";

function AddBoardForm() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const hideModal = useHideModal();
  const addBoard = useAddBoard();

  const handleModalOkClick = () => {
    const title = titleRef.current?.value;
    const desc = descRef.current?.value;

    addBoard(title, desc);
    hideModal();
  };
  const handleModalCloseClick = () => {
    hideModal();
  };

  return (
    <div className="add-board-container">
      <div>
        <div>
          <div>보드 이름</div>
          <input
            className="textfield"
            ref={titleRef}
            type="text"
            placeholder="보드 이름을 입력하세요."
          ></input>
        </div>
        <div>
          <div>보드 설명</div>
          <textarea
            className="textfield noresize"
            ref={descRef}
            placeholder="보드를 설명해 주세요."
          ></textarea>
        </div>
      </div>
      <div>
        <button onClick={handleModalOkClick}>ok</button>
        <button onClick={handleModalCloseClick}>close</button>
      </div>
    </div>
  );
}

export default AddBoardForm;
