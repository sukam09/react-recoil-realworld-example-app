import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getUser } from "../../api/user";

const LoginHeader = () => {
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await (
        await getUser("/user", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      ).data;
      setUsername(data.user.username);
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  };

  // TODO: can render only once?
  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      <li className="nav-item">
        <Link to="/editor" className="nav-link">
          <i className="ion-compose"></i> New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <i className="ion-gear-a"></i> Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/${username}`} className="nav-link">
          {username}
        </Link>
      </li>
    </>
  );
};

export default LoginHeader;
