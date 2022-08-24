import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Loading from "@/components/Loading";
import { getUser } from "@/api/user";
import { getProfile } from "@/api/profile";

import { menuState } from "@/shared/atom";
import { TEST_IMAGE } from "@/shared/dummy";
import useLogout from "@/hooks/useLogout";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    image: "",
    username: "",
    bio: "",
    following: false,
  });
  const { image, username, bio, following } = profile;
  const [loginUsername, setLoginUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const setMenu = useSetRecoilState(menuState);
  const { userId } = useParams();
  const navigate = useNavigate();
  const onLogout = useLogout();

  useEffect(() => {
    const initProfile = async () => {
      try {
        const data = await getProfile(`/profiles/${userId}`);
        const profileData = data.profile;
        setProfile({
          // image: profileData.image,
          image: TEST_IMAGE,
          username: profileData.username,
          bio: profileData.bio,
          following: profileData.following,
        });
        setLoading(false);
      } catch (error: any) {
        navigate("/", { replace: true });
      }
    };
    initProfile();
  }, [navigate, userId]);

  useEffect(() => {
    const checkLoginUsername = async () => {
      try {
        const data = await getUser("/user");
        setLoginUsername(data.user.username);
      } catch (error: any) {
        onLogout();
      }
    };
    checkLoginUsername();
  }, [loginUsername, setMenu, username, navigate, onLogout]);

  useEffect(() => {
    username === loginUsername ? setMenu(5) : setMenu(-1);
  }, [username, loginUsername, setMenu]);

  return (
    <>
      <div className="user-info">
        {loading ? (
          <Loading height="30vh" />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} className="user-img" alt="profile" />
                <h4>{username}</h4>
                <p>{bio}</p>
                <Link to="/settings">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
