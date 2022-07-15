import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { User, IsLoggedin } from "../store/atom";

const Header = () => {
  const isLoggedin = useRecoilValue(IsLoggedin);
  const username = useRecoilValue(User).username;
  // const user = useRecoilValue(User);
  // const username = user.username;
  // console.log(isLoggedin, user);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {isLoggedin && (
            <li className="nav-item">
              <NavLink to="/editor" className="nav-link">
                <i className="ion-compose" />
                &nbsp;New Article
              </NavLink>
            </li>
          )}
          {!isLoggedin && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Sign in
              </NavLink>
            </li>
          )}
          {!isLoggedin && (
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign up
              </NavLink>
            </li>
          )}
          {isLoggedin && (
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                Settings
              </NavLink>
            </li>
          )}
          {isLoggedin && (
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                {username}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
