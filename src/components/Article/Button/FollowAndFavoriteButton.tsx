interface FollowAndFavoriteButtonProps {
  username: string;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
}

const FollowAndFavoriteButton = ({
  username,
  following,
  favorited,
  favoritesCount,
}: FollowAndFavoriteButtonProps) => {
  return (
    <>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i> Follow {username}{" "}
      </button>{" "}
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i> Favorite Post{" "}
        <span className="counter">({favoritesCount})</span>
      </button>
    </>
  );
};

export default FollowAndFavoriteButton;
