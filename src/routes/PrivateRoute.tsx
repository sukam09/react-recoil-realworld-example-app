import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isLoggedInState } from "../state";

const PrivateRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
