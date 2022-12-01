import { useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import UserProfile from "../components/UserProfile";

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
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={toggle === 1 ? ACTIVE_CLASS : INACTIVE_CLASS}
                      to={`/profile/${userId}/favorites`}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <Outlet context={{ handleToggle }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
