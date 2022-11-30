interface FollowButtonProps {
  following: boolean;
  username: string;
  follow: () => void;
  unfollow: () => void;
}

const FollowButton = ({
  following,
  username,
  follow,
  unfollow,
}: FollowButtonProps) => {
  const handleClick = async () => {
    following ? unfollow() : follow();
  };

  return (
    <>
      <button
        className={`btn btn-sm action-btn ${
          following ? "btn-secondary" : "btn-outline-secondary"
        }`}
        type="button"
        onClick={handleClick}
      >
        <i className="ion-plus-round"></i>
        {following ? "Unfollow" : "Follow"} {username}
      </button>
    </>
  );
};

export default FollowButton;
