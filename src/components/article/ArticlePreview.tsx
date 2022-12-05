import { Link } from "react-router-dom";

import { ArticleProps } from "../../types";
import { convertToDate } from "../../utils";
import ArticleTag from "../tag/ArticleTag";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const UNFAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const ArticlePreview = ({ article }: { article: ArticleProps }) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{convertToDate(article.createdAt)}</span>
        </div>
        <div className="pull-xs-right">
          <button
            type="button"
            className={article.favorited ? FAVORITED_CLASS : UNFAVORITED_CLASS}
          >
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <ArticleTag key={tag} name={tag} />
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
