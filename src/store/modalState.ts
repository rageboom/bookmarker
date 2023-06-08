import { ReactNode } from "react";
import { atom } from "recoil";
interface IModal {
  show: boolean | null;
  title: string;
  pos: { x: number; y: number };
  content: ReactNode;
}
export const modalState = atom<IModal>({
  key: "modal",
  default: {
    show: null,
    pos: { x: 0, y: 0 },
    title: "Frontend",
    content: null,
  },
});
