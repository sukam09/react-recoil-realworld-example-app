import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: {
    email: "",
    username: "",
    bio: "",
    image: "",
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});
