import { atom } from "recoil";
export type ListItemType = {
  id: string;
  href: string;
  name: string;
  favicon: string;
};
export type CategoryType = {};
export type CategoryStateType = {
  [key: string]: [
    {
      name: string;
      list: ListItemType[];
    }
  ];
};
export const categoryState = atom<CategoryStateType>({
  key: "categoryState",
  default: {
    "1": [
      {
        name: "웹팩 참고",
        list: [
          {
            id: "a",
            href: "https://naver.com",
            name: "네이버",
            favicon: "https://naver.com/favicon.ico",
          },
        ],
      },
    ],
    "2": [
      {
        name: "참고 하기",
        list: [
          {
            id: "b",
            href: "https://puffy-stick-fa1.notion.site/2023-a973404b283642c7995ee7b615aa7993",
            name: "우아한 스터디",
            favicon: "",
          },
        ],
      },
    ],
    "3": [
      {
        name: "웹팩 참고",
        list: [
          {
            id: "a",
            href: "https://naver.com",
            name: "네이버",
            favicon: "https://naver.com/favicon.ico",
          },
        ],
      },
    ],
    "4": [
      {
        name: "웹팩 참고",
        list: [
          {
            id: "a",
            href: "https://naver.com",
            name: "네이버",
            favicon: "https://naver.com/favicon.ico",
          },
        ],
      },
    ],
    "5": [
      {
        name: "웹팩 참고",
        list: [
          {
            id: "a",
            href: "https://naver.com",
            name: "네이버",
            favicon: "https://naver.com/favicon.ico",
          },
        ],
      },
    ],
  },
});
