import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInAtom } from '../../atom';

const FOLLOWED_CLASS = 'btn btn-sm action-btn btn-secondary';
const UNFOLLOWED_CLASS = 'btn btn-sm action-btn btn-outline-secondary';

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
  const [disabled, setDisabled] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const navigate = useNavigate();

  return (
    <>
      <button
        className={
          following
            ? `${FOLLOWED_CLASS} ${disabled ? 'disabled' : ''}`
            : `${UNFOLLOWED_CLASS} ${disabled ? 'disabled' : ''}`
        }
        type="button"
        onClick={async () => {
          if (!isLoggedIn) navigate('/login');
          setDisabled(true);
          following ? await unfollow() : await follow();
          setDisabled(false);
        }}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {following ? 'Unfollow' : 'Follow'} {username}
      </button>
    </>
  );
};

export default FollowButton;
