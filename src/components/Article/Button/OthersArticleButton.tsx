interface OthersArticleButtonProps {
  username: string;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
}

const OthersArticleButton = ({
  username,
  following,
  favorited,
  favoritesCount,
}: OthersArticleButtonProps) => {
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

export default OthersArticleButton;
