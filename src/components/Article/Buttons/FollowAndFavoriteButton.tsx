import { Dispatch, SetStateAction } from "react";
import { postFollow, deleteFollow } from "../../../api/profile";
import { postFavorites, deleteFavorites } from "../../../api/favorites";
import { ArticleProps } from "../../../types";

interface FollowAndFavoriteButtonProps {
  article: ArticleProps;
  setArticle: Dispatch<SetStateAction<ArticleProps>>;
}

const FollowAndFavoriteButton = ({
  article,
  setArticle,
}: FollowAndFavoriteButtonProps) => {
  const { slug, favorited, favoritesCount, author } = article;
  const { username, following } = author;

  // FIXME: 두 버튼 빠르게 눌렀을때 서로 영향받는 issue 있음
  const follow = async () => {
    if (following) {
      await deleteFollow(`/profiles/${username}/follow`);
    } else {
      await postFollow(`/profiles/${username}/follow`);
    }
    setArticle({
      ...article,
      author: { ...author, following: !following },
    });
  };

  const favorite = async () => {
    if (favorited) {
      await deleteFavorites(`/articles/${slug}/favorite`);
    } else {
      await postFavorites(`/articles/${slug}/favorite`);
    }
    setArticle({
      ...article,
      favorited: !favorited,
      favoritesCount: favorited ? favoritesCount - 1 : favoritesCount + 1,
    });
  };

  return (
    <>
      <button
        type="button"
        className={`btn btn-sm btn${following ? "" : "-outline"}-secondary`}
        onClick={follow}
      >
        <i className="ion-plus-round"></i> {following ? "Unfollow" : "Follow"}{" "}
        {username}{" "}
      </button>{" "}
      <button
        type="button"
        className={`btn btn-sm btn${favorited ? "" : "-outline"}-primary`}
        onClick={favorite}
      >
        <i className="ion-heart"></i> {favorited ? "Unfavorite" : "Favorite"}{" "}
        Article <span className="counter">({favoritesCount})</span>
      </button>
    </>
  );
};

export default FollowAndFavoriteButton;
