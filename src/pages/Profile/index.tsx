import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import { getUser } from "@/api/user";

const Profile = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await (
        await getUser("/user", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      ).data;
      // FIXME: GET /user API not working
      // setImage(data.user.image);
      setImage(
        "https://static.solved.ac/uploads/profile/360x360/sukam09-picture-1656571593328.png"
      ); // arbitrary
      setUsername(data.user.username);
      setBio(data.user.bio);
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} className="user-img" alt="profile" />
                <h4>{username}</h4>
                <p>{bio}</p>
                <Link to="/settings">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to={`/profile/${username}`}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/profile/${username}/favorites`}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <Link to="">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </Link>
                  <div className="info">
                    <Link to="" className="author">
                      Eric Simons
                    </Link>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 29
                  </button>
                </div>
                <Link to="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more@.</span>
                </Link>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <Link to="">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </Link>
                  <div className="info">
                    <Link to="" className="author">
                      Albert Pai
                    </Link>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <Link to="" className="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more@.</span>
                  <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline">Music</li>
                    <li className="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
