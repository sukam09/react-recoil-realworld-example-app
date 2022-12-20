import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Loading from "../common/Loading";
import { getProfile } from "../../api/profile";
import { userState } from "../../state";
import FollowButton from "../common/FollowButton";
import { postFollow, deleteFollow } from "../../api/profile";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
    bio: "",
    following: false,
  });
  const { image, username, bio, following } = userInfo;
  const [loading, setLoading] = useState(true);

  const user = useRecoilValue(userState);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const initUserInfo = async () => {
      try {
        const data = await getProfile(`/profiles/${userId}`);
        const { image, username, bio, following } = data.profile;
        setUserInfo({
          image: image,
          username: username,
          bio: bio,
          following: following,
        });
      } catch (err: any) {
        navigate("/", { replace: true });
      }
    };
    initUserInfo().then(() => setLoading(false));
  }, [navigate, userId]);

  const follow = async () => {
    await postFollow(`/profiles/${userId}/follow`);
    setUserInfo({
      ...userInfo,
      following: true,
    });
  };

  const unfollow = async () => {
    await deleteFollow(`/profiles/${userId}/follow`);
    setUserInfo({
      ...userInfo,
      following: false,
    });
  };

  return (
    <>
      <div className="user-info">
        {loading ? (
          <Loading text="profile" />
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

export default UserInfo;
