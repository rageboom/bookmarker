import { atom } from "recoil";

interface IBoardState {
  id: string;
  title: string;
  desc?: string;
}
export const boardState = atom<IBoardState[]>({
  key: "boards",
  default: [
    {
      id: "1",
      title: "Frontend",
      desc: "프론트앤드",
    },
    {
      id: "2",
      title: "Backend",
      desc: "백앤드",
    },
    {
      id: "3",
      title: "Game",
      desc: "게임",
    },
    {
      id: "4",
      title: "Movie",
      desc: "영화",
    },
    {
      id: "5",
      title: "Music",
      desc: "음악",
    },
  ],
});
