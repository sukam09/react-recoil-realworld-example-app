import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import LoginHeader from './LoginHeader';
import LogoutHeader from './LogoutHeader';
import { isLoggedInAtom } from '../../atom';

const Header = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? <LoginHeader /> : <LogoutHeader />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
