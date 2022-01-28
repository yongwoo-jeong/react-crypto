import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isCandleAtom = atom({
  key: "isCandle",
  default: true,
});
