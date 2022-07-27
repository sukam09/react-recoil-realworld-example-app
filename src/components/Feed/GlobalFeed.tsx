import { Link } from "react-router-dom";

const GlobalFeed = () => {
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <Link to="/">
            <img
              src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4661.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1658762585003"
              alt="test"
            />
          </Link>
          <div className="info">
            <Link to="/" className="author">
              Eric Simons
            </Link>
            <span className="date">January 20th</span>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm pull-xs-right"
          >
            <i className="ion-heart" /> 29
          </button>
        </div>
        <Link to="/" className="preview-link">
          <h1>How to build webapps that scale</h1>
          <p>This is the description for the post.</p>
          <span>Read more...</span>
        </Link>
      </div>
    </>
  );
};

export default GlobalFeed;
