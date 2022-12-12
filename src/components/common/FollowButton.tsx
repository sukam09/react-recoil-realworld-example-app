import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state";

const FOLLOWING_CLASS = "btn btn-sm action-btn btn-secondary";
const UNFOLLOWING_CLASS = "btn btn-sm action-btn btn-outline-secondary";

interface FollowButtonProps {
  following: boolean;
  username: string;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
}

const FollowButton = ({
  following,
  username,
  follow,
  unfollow,
}: FollowButtonProps) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();

  return (
    <>
      <button
        className={following ? FOLLOWING_CLASS : UNFOLLOWING_CLASS}
        type="button"
        onClick={() => {
          if (!isLoggedIn) navigate("/register");
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
