import { Link } from "react-router-dom";

const LoginHeader = () => {
  const username = JSON.parse(localStorage.getItem("user")!).username;

  return (
    <>
      <li className="nav-item">
        <Link to="/editor" className="nav-link">
          <i className="ion-compose"></i> New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <i className="ion-gear-a"></i> Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/${username}`} className="nav-link">
          {username}
        </Link>
      </li>
    </>
  );
};

export default LoginHeader;
