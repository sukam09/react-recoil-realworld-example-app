import { atom } from "recoil";

export const User = atom({
  key: "user",
  default: {
    email: "",
    username: "",
    bio: "",
    image: "",
    token: "",
  },
});

export const IsLoggedin = atom({
  key: "isLoggedin",
  default: false,
});
