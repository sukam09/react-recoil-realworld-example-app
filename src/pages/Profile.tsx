import { useEffect, useState } from "react";
import { NavLink, Link, useParams, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import UserInfo from "../components/profile/UserInfo";
import Feed from "../components/feed/Feed";

const Profile = () => {
  const { userId } = useParams();
  const [toggle, setToggle] = useState(0);
  const handleToggle = (num: number) => setToggle(num);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>@{userId} — Conduit</title>
        </Helmet>
      </HelmetProvider>

      <div className="profile-page">
        <UserInfo />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      end
                      to={encodeURI(`/profile/${userId}`)}
                    >
                      My Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      end
                      to={encodeURI(`/profile/${userId}/favorites`)}
                    >
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Feed
                      query={`?author=${userId}`}
                      url={`/profile/${userId}`}
                    />
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Feed
                      query={`?favorited=${userId}`}
                      url={`/profile/${userId}/favorites`}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
