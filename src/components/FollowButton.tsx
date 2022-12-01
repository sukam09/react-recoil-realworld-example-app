const FOLLOWING_CLASS = "btn btn-sm action-btn btn-secondary";
const UNFOLLOWING_CLASS = "btn btn-sm action-btn btn-outline-secondary";

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
  return (
    <>
      <button
        className={following ? FOLLOWING_CLASS : UNFOLLOWING_CLASS}
        type="button"
        onClick={() => {
          following ? unfollow() : follow();
        }}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {following ? "Unfollow" : "Follow"} {username}
      </button>
    </>
  );
};

export default FollowButton;
