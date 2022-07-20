import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import { UserProps } from "../types/type";
import { putUser } from "../api/user";

const Settings = () => {
  const [user, setUser] = useState<UserProps>({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => setUser(JSON.parse(localStorage.getItem("user")!)), []);

  // const onEditProfile = () => {
  //   putUser("/user", {
  //     user: {},
  //   });
  // };

  const onLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header />

      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      defaultValue={user.image}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={user.username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      defaultValue={user.bio}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={user.email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      defaultValue={user.password}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
                <hr />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onLogout()}
                >
                  Or click here to logout.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
