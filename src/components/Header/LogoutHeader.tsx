import { NavLink } from "react-router-dom";

const LogoutHeader = () => {
  return (
    <>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Sign in
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">
          Sign up
        </NavLink>
      </li>
    </>
  );
};

export default LogoutHeader;
