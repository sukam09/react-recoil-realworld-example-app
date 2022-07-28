import { useRecoilValue } from "recoil";
import { Outlet, Navigate } from "react-router-dom";

import { loginState } from "@/store/state";

const PrivateRoute = () => {
  const login = useRecoilValue(loginState);
  return login ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
