import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { loginState } from "@/store/state";

const useLogout = () => {
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const onLogout = () => {
    setLogin(false);
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return onLogout;
};

export default useLogout;
