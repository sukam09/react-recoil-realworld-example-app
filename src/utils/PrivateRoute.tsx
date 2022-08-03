import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { loginState } from "@/store/state";

const PrivateRoute = () => {
  const login = useRecoilValue(loginState);
  return login ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
