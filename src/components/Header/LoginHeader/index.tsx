import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import UserImage from "@components/Header/LoginHeader/UserImage";
import { menuState } from "@store/state";

const LoginHeader = () => {
  const menu = useRecoilValue(menuState);

  return (
    <>
      <>
        <li className="nav-item">
          <Link to="/editor" className={`nav-link ${menu === 3 && "active"}`}>
            <i className="ion-compose"></i> New Article
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className={`nav-link ${menu === 4 && "active"}`}>
            <i className="ion-gear-a"></i> Settings
          </Link>
        </li>
        <UserImage />
      </>
    </>
  );
};

export default LoginHeader;
