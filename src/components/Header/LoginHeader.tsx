import { NavLink } from "react-router-dom";

const LoginHeader = () => {
  const username = localStorage.getItem("username");

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
