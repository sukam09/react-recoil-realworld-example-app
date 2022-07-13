import { atom } from "recoil";

export const user = atom({
  key: "user",
  default: {
    email: "",
    password: "",
  },
});
