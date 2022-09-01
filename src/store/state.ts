import { atom } from "recoil";

export const menuState = atom({
  key: "menuState",
  default: 0,
});

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  },
});

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});
