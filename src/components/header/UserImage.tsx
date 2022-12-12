import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState, menuState } from "../../state";

const UserImage = () => {
  const user = useRecoilValue(userState);
  const menu = useRecoilValue(menuState);

  return (
    <>
      <li className="nav-item">
        <Link
          to={`/profile/${user.username}`}
          className={`nav-link ${menu === 5 && "active"}`}
        >
          <img className="user-pic" src={user.image} />
          {user.username}
        </Link>
      </li>
    </>
  );
};

export default UserImage;
