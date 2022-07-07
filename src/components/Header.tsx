import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/">
          <div className="navbar-brand">conduit</div>
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <Link to="/">
            <li className="nav-item">
              <div className="nav-link active">Home</div>
            </li>
          </Link>
          <Hidden>
            <Link to="/editor">
              <li className="nav-item">
                <div className="nav-link">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </div>
              </li>
            </Link>
          </Hidden>
          <Link to="/login">
            <li className="nav-item">
              <div className="nav-link">Sign in</div>
            </li>
          </Link>

          <li className="nav-item">
            <Link to="/register">
              <div className="nav-link">Sign Up</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const Hidden = styled.div`
  display: none;
`;
