import { useRef } from "react";
import { useAddBoard } from "../hooks/boardHook";
import { useHideModal } from "../hooks/modalHook";

function AddBoardForm () {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
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
    <div>
      <div>here is content</div>
      <div>
        <input
          ref={titleRef}
          type="text"
          placeholder="보드 이름을 입력하세요."
        ></input>
        <input
          ref={descRef}
          type="text"
          placeholder="보드를 설명해 주세요."
        ></input>
      </div>
      <button onClick={handleModalOkClick}>ok</button>
      <button onClick={handleModalCloseClick}>close</button>
    </div>
  )
  
}

export default AddBoardForm