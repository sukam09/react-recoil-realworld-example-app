import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { menuState } from "@/store/state";

const LogoutHeader = () => {
  const menu = useRecoilValue(menuState);

  return (
    <>
      <li className="nav-item">
        <Link to="/login" className={`nav-link ${menu === 1 && "active"}`}>
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className={`nav-link ${menu === 2 && "active"}`}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default LogoutHeader;
