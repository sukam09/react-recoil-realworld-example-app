import { Link } from "react-router-dom";

const LogoutHeader = () => {
  return (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </>
  );
};

export default LogoutHeader;
