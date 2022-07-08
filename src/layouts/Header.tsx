import React from 'react';
import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            {/* TODO: replace hidden property using state management library or props */}
            <NavLink to="/editor" className="nav-link" hidden>
              <i className="ion-compose" />
              &nbsp;New Article
            </NavLink>
          </li>
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
        </ul>
      </div>
    </nav>
  );
}
