import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { getUser } from "@/api/user";
import { menuState } from "@/store/state";
import Loading from "@/components/Loading";
import useLogout from "@/hooks/useLogout";

import { TEST_IMAGE } from "@/shared/dummy";

const UserImage = () => {
  const [userInfo, setUserInfo] = useState({
    image: "",
    username: "",
  });
  const { image, username } = userInfo;
  const [loading, setLoading] = useState(true);

  const menu = useRecoilValue(menuState);
  const navigate = useNavigate();
  const onLogout = useLogout();

  useEffect(() => {
    const getUsername = async () => {
      try {
        const data = await getUser("/user");
        const user = data.user;
        setUserInfo({
          // FIXME: API error
          // image: user.image,
          image: TEST_IMAGE,
          username: user.username,
        });
        setLoading(false);
      } catch (error: any) {
        onLogout();
      }
    };
    getUsername();
  }, [navigate, onLogout]);

  return (
    <>
      {loading ? (
        <li className="nav-item">
          <Loading />
        </li>
      ) : (
        <li className="nav-item">
          <Link
            to={`/profile/${username}`}
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
