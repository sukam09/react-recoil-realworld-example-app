import { Link, useNavigate } from "react-router-dom";
import { ArticleProps } from "../../types";
import FollowButton from "../FollowButton";

import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const UNFAVORITED_CLASS = "btn btn-sm btn-outline-primary";

interface ArticleActionProps {
  isUser: boolean;
  removeArticle: () => Promise<void>;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
  favorite: () => Promise<void>;
  unfavorite: () => Promise<void>;
  article: ArticleProps;
}

const ArticleAction = ({
  isUser,
  removeArticle,
  follow,
  unfollow,
  favorite,
  unfavorite,
  article,
}: ArticleActionProps) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();

  return isUser ? (
    <>
      <Link to={`/editor/${article.slug}`}>
        <button className="btn btn-sm btn-outline-secondary" type="button">
          <i className="ion-edit"></i> Edit Article
        </button>{" "}
      </Link>
      <button
        className="btn btn-sm btn-outline-danger"
        type="button"
        onClick={() => removeArticle()}
      >
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  ) : (
    <>
      <FollowButton
        following={article.author.following}
        username={article.author.username}
        follow={follow}
        unfollow={unfollow}
      />
      &nbsp;
      <button
        className={article.favorited ? FAVORITED_CLASS : UNFAVORITED_CLASS}
        type="button"
        onClick={() => {
          if (!isLoggedIn) navigate("/register");
          article.favorited ? unfavorite() : favorite();
        }}
      >
        <i className="ion-heart"></i>
        &nbsp; {article.favorited ? "Unfavorite" : "Favorite"} Post
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </>
  );
};

export default ArticleAction;
