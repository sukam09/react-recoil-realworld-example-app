import { useState } from "react";
import { Link, useParams, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import UserProfile from "../components/profile/UserProfile";
import Feed from "../components/feed/Feed";

const ACTIVE_CLASS = "nav-link active";
const INACTIVE_CLASS = "nav-link";

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
        <UserProfile />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      className={toggle === 0 ? ACTIVE_CLASS : INACTIVE_CLASS}
                      to={`/profile/${userId}`}
                      onClick={() => setToggle(0)}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={toggle === 1 ? ACTIVE_CLASS : INACTIVE_CLASS}
                      to={`/profile/${userId}/favorites`}
                      onClick={() => setToggle(1)}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>
              <Routes>
                <Route
                  path=""
                  element={
                    <Feed
                      query={`?author=${userId}`}
                      url={`/profile/${userId}`}
                      num={0}
                      handleToggle={handleToggle}
                    />
                  }
                />
                <Route
                  path="favorites"
                  element={
                    <Feed
                      query={`?favorited=${userId}`}
                      url={`/profile/${userId}/favorites`}
                      num={1}
                      handleToggle={handleToggle}
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
