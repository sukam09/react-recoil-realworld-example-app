import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const tokenState = atom({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: "login",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// export const userState = atom({
//   key: "user",
//   default: {
//     email: "",
//     username: "",
//     bio: "",
//     image: "",
//     token: "",
//   },
//   effects_UNSTABLE: [persistAtom],
// });
