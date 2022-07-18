import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="user-img"
                  alt="profile"
                />
                <h4>Eric Simons</h4>
                <p>
                  Cofounder @GoThinkster, lived in Aol's HQ for a few months,
                  kinda looks like Peeta from the Hunger Games
                </p>
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i> Follow Eric Simons
                </button>
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
                    <NavLink className="nav-link active" to="">
                      My Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="">
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <NavLink to="">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </NavLink>
                  <div className="info">
                    <NavLink to="" className="author">
                      Eric Simons
                    </NavLink>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 29
                  </button>
                </div>
                <NavLink to="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </NavLink>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <NavLink to="">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </NavLink>
                  <div className="info">
                    <NavLink to="" className="author">
                      Albert Pai
                    </NavLink>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <NavLink to="" className="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline">Music</li>
                    <li className="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
