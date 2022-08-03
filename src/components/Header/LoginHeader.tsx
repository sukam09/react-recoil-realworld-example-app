import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getUser } from "@/api/user";
import { tokenState, menuState, loginState } from "@/store/state";

const LoginHeader = () => {
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
  });
  const { image, username } = userInfo;
  const token = useRecoilValue(tokenState);
  const menu = useRecoilValue(menuState);
  const setLogin = useSetRecoilState(loginState);

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
      } catch (error: any) {
        setLogin(false);
        localStorage.clear();
      }
    };
    getUsername();
  }, [token, setLogin]);

  return (
    <>
      <li className="nav-item">
        <Link to="/editor" className={`nav-link ${menu === 3 && "active"}`}>
          <i className="ion-compose"></i> New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/settings" className={`nav-link ${menu === 4 && "active"}`}>
          <i className="ion-gear-a"></i> Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/@${username}`}
          className={`nav-link ${menu === 5 && "active"}`}
        >
          <img className="user-pic" src={image} />
          {username}
        </Link>
      </li>
    </>
  );
};

export default LoginHeader;
