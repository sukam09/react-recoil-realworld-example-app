import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";
import { menuState } from "../../state";

const Header = () => {
  const isLoggedIn = localStorage.getItem("token");
  const menu = useRecoilValue(menuState);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${menu === 0 && "active"}`}>
              Home
            </Link>
          </li>
          {isLoggedIn ? <LoginHeader /> : <LogoutHeader />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
