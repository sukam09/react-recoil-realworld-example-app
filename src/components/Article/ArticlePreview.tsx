import { Link } from "react-router-dom";

import { ArticlePreviewProps } from "@shared/type";
import convertToDate from "@utils/convertToDate";

const ArticlePreview = ({
  slug,
  title,
  description,
  tagList,
  createdAt,
  favorited,
  favoritesCount,
  author: { username, image },
}: ArticlePreviewProps) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${username}`}>
          <img src={image} />
        </Link>
        <div className="info">
          <Link to={`/profile/${username}`} className="author">
            {username}
          </Link>
          <span className="date">{convertToDate(createdAt)}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;
