import { produce } from "immer";
import { useRecoilState } from "recoil";
import { boardState } from "../store/boardsState";

export const useAddBoard = () => {
  const [, setBoard] = useRecoilState(boardState);

  return (title: string = "", desc: string | undefined) => {
    setBoard((state) =>
      produce(state, (draft) => {
        draft.unshift({
          id: state.length + "1",
          title: title,
          desc: desc,
        });
      })
    );
  };
};

export const useDeleteBoard = () => {
  const [, setBoard] = useRecoilState(boardState);
  return (id: string) => {
    setBoard((state) =>
      produce(state, (draft) => {
        draft = draft.filter((item) => item.id !== id);
      })
    );
  };
};

export const useEditBoard = () => {
  const [, setBoard] = useRecoilState(boardState);
  return (id: string, title: string, desc: string) => {
    setBoard((state) =>
      produce(state, (draft) => {
        const found = draft.find((item) => item.id === id);
        if (found) {
          found.title = title;
          found.desc = desc;
        }
      })
    );
  };
};
