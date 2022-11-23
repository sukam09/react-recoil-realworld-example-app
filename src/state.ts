import { atom } from "recoil";

export const menuState = atom({
  key: "menuState",
  default: 0,
});

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    username: "",
    bio: "",
    image: "",
  },
});
