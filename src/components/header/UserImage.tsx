import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "../../state";

const UserImage = () => {
  const user = useRecoilValue(userState);

  return (
    <>
      <li className="nav-item">
        <NavLink
          to={encodeURI(`/profile/${user.username}`)}
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <img className="user-pic" src={user.image} />
          {user.username}
        </NavLink>
      </li>
    </>
  );
};

export default UserImage;
