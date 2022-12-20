import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import UserImage from "./UserImage";
import { menuState } from "../../state";

const LoginHeader = () => {
  const menu = useRecoilValue(menuState);

  return (
    <>
      <>
        <li className="nav-item">
          <NavLink
            to="/editor"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <i className="ion-compose"></i> New Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <i className="ion-gear-a"></i> Settings
          </NavLink>
        </li>
        <UserImage />
      </>
    </>
  );
};

export default LoginHeader;
