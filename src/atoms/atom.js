import { atom } from "recoil";

export const modalAtom = atom({
  key: "modalAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const addModalAtom = atom({
  key: "addModalAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const modalInfoAtom = atom({
  key: "modalInfoAtom", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export const entitiesAtom = atom({
  key: "entitiesAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
