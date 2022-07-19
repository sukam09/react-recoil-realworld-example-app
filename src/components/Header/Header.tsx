import { NavLink } from "react-router-dom";

import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";

const Header = () => {
  const isLoggedin = localStorage.getItem("jwtToken") !== null;

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
          {isLoggedin ? <LoginHeader /> : <LogoutHeader />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
