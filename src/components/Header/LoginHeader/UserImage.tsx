import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getUser } from "@/api/user";
import { tokenState, menuState, loginState } from "@/store/state";
import Loading from "@/components/Loading";

const UserImage = () => {
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
  });
  const { image, username } = userInfo;
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(tokenState);
  const menu = useRecoilValue(menuState);
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const data = await (
          await getUser("/user", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
        ).data;
        const user = data.user;
        setUserInfo({
          // FIXME: API error
          // image: user.image,
          image:
            "https://opgg-static.akamaized.net/images/profile_icons/profileIcon4661.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1658762585003",
          username: user.username,
        });
        setLoading(false);
      } catch (error: any) {
        setLogin(false);
        localStorage.clear();
        navigate("/", { replace: true });
      }
    };
    getUsername();
  }, [token, setLogin, navigate]);

  return (
    <>
      {loading ? (
        <li className="nav-item">
          <Loading />
        </li>
      ) : (
        <li className="nav-item">
          <Link
            to={`/@${username}`}
            className={`nav-link ${menu === 5 && "active"}`}
          >
            <img className="user-pic" src={image} />
            {username}
          </Link>
        </li>
      )}
    </>
  );
};

export default UserImage;
