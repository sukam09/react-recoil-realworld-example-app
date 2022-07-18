import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { User } from "../../store/atom";

const LoginHeader = () => {
  const username = useRecoilValue(User).username;

  return (
    <>
      <li className="nav-item">
        <NavLink to="/editor" className="nav-link">
          <i className="ion-compose"></i> New Article
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/settings" className="nav-link">
          <i className="ion-gear-a"></i> Settings
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
          {username}
        </NavLink>
      </li>
    </>
  );
};

export default LoginHeader;
