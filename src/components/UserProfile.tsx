import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getUser } from "@/api/user";
import { getProfile } from "@/api/profile";
import { tokenState, menuState, loginState } from "@/store/state";
import Loading from "@/components/Loading";

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

  const token = useRecoilValue(tokenState);
  const setMenu = useSetRecoilState(menuState);
  const setLogin = useSetRecoilState(loginState);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const initProfile = async () => {
      try {
        const data = await (await getProfile(`/profiles/${userId}`)).data;
        const profileData = data.profile;
        setProfile({
          // image: profileData.image,
          image:
            "https://opgg-static.akamaized.net/images/profile_icons/profileIcon4661.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1658762585003",
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
        const data = await (
          await getUser("/user", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
        ).data;
        setLoginUsername(data.user.username);
      } catch (error: any) {
        setLogin(false);
        localStorage.clear();
        navigate("/", { replace: true });
      }
    };
    checkLoginUsername();
  }, [loginUsername, setMenu, token, username, navigate, setLogin]);

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
