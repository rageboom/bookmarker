import { modalState } from "../store/modalState";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import { type ReactNode } from "react";

export const useHideModal = () => {
  const [, setModalState] = useRecoilState(modalState);
  return (target?: HTMLElement) =>
    setModalState((state) =>
      produce(state, (draft) => {
        const pos = { x: 0, y: 0 };
        if (target) {
          const rect = target.getBoundingClientRect();
          pos.x = rect.x;
          pos.y = rect.y;
        }

        draft.show = false;
        draft.title = "";
        draft.content = null;
        draft.pos = pos;
      })
    );
};

export const useShowModal = () => {
  const [, setModalState] = useRecoilState(modalState);
  return (title: string, content: ReactNode, target?: HTMLElement) =>
    setModalState((state) =>
      produce(state, (draft) => {
        const pos = { x: 0, y: 0 };
        if (target) {
          const rect = target.getBoundingClientRect();
          pos.x = rect.x;
          pos.y = rect.y;
        }
        draft.show = true;
        draft.title = title;
        draft.content = content;
        draft.pos = pos;
      })
    );
};
