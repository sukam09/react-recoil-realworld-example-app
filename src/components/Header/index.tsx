import { Link } from "react-router-dom";

import LoginHeader from "@/components/Header/LoginHeader";
import LogoutHeader from "@/components/Header/LogoutHeader";

const Header = () => {
  const isLoggedin = localStorage.getItem("token") !== null;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {isLoggedin ? <LoginHeader /> : <LogoutHeader />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
