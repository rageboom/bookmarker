import { modalState } from "../store/modalState";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { type ReactNode } from "react";

export const useHideModal = () => {
  const [, setModalState] = useRecoilState(modalState);
  return () =>
    setModalState((state) =>
      produce(state, (draft) => {
        draft.show = false;
        draft.title = "";
        draft.content = null;
      })
    );
};

export const useShowModal = () => {
  const [, setModalState] = useRecoilState(modalState);
  return (title: string, content: ReactNode) =>
    setModalState((state) =>
      produce(state, (draft) => {
        draft.show = true;
        draft.title = title;
        draft.content = content;
      })
    );
};
