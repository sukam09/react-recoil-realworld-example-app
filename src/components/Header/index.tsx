import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import LoginHeader from "@/components/Header/LoginHeader";
import LogoutHeader from "@/components/Header/LogoutHeader";
import { loginState } from "@/store/state";

const Header = () => {
  const login = useRecoilValue(loginState);

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
          {login ? <LoginHeader /> : <LogoutHeader />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
