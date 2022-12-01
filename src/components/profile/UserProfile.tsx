import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Loading from "../Loading";
import { getProfile } from "../../api/profile";
import { menuState, userState } from "../../state";
import FollowButton from "../FollowButton";
import { postFollow, deleteFollow } from "../../api/profile";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    image: "",
    username: "",
    bio: "",
    following: false,
  });
  const { image, username, bio, following } = profile;
  const [loading, setLoading] = useState(true);

  const setMenu = useSetRecoilState(menuState);
  const user = useRecoilValue(userState);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    user.username === userId ? setMenu(5) : setMenu(-1);
  }, [setMenu, user.username, userId]);

  useEffect(() => {
    const initProfile = async () => {
      const data = await getProfile(`/profiles/${userId}`);
      const { image, username, bio, following } = data.profile;
      setProfile({
        image: image,
        username: username,
        bio: bio,
        following: following,
      });
    };
    initProfile().then(() => setLoading(false));
  }, [navigate, userId]);

  const follow = async () => {
    setProfile({
      ...profile,
      following: true,
    });
    await postFollow(`/profiles/${userId}/follow`);
  };

  const unfollow = async () => {
    setProfile({
      ...profile,
      following: false,
    });
    await deleteFollow(`/profiles/${userId}/follow`);
  };

  return (
    <>
      <div className="user-info">
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} className="user-img" alt="profile" />
                <h4>{username}</h4>
                <p>{bio}</p>
                {user.username === userId ? (
                  <Link to="/settings">
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-gear-a"></i> Edit Profile Settings
                    </button>
                  </Link>
                ) : (
                  <FollowButton
                    following={following}
                    username={userId!}
                    follow={follow}
                    unfollow={unfollow}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
