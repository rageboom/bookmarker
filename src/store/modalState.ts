import { ReactNode } from "react";
import { atom } from "recoil";
interface IModal {
  show: boolean;
  title: string;
  content: ReactNode;
}
export const modalState = atom<IModal>({
  key: "modal",
  default: {
    show: false,
    title: "Frontend",
    content: null,
  },
});
