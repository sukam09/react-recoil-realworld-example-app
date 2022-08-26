import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Loading from "@/components/Loading";
import { getUser, putUser } from "@/api/user";

import { menuState } from "@/store/state";

const Settings = () => {
  const [settings, setSettings] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });
  const { image, username, bio, email, password } = settings;
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const setMenu = useSetRecoilState(menuState);
  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const updateSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    const data = await putUser("/user", {
      user: {
        image: image,
        username: username,
        bio: bio,
        email: email,
        password: password,
      },
    });
    localStorage.setItem("token", data.user.token);
    navigate(`/profile/${username}`);
    setDisabled(false);
  };

  const onLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const initSettings = async () => {
      const data = await getUser("/user");
      const user = data.user;
      setSettings({
        ...user,
        password: "",
      });
      setLoading(false);
    };
    initSettings();
  }, [navigate]);

  useEffect(() => {
    setMenu(4);
  }, [setMenu]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Settings — Conduit</title>
        </Helmet>
      </HelmetProvider>

      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {loading ? (
                <Loading height="50vh" />
              ) : (
                <form onSubmit={(event) => updateSettings(event)}>
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                        name="image"
                        value={image}
                        onChange={onChange}
                        disabled={disabled}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                        name="username"
                        value={username}
                        onChange={onChange}
                        disabled={disabled}
                        autoComplete="off"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                        name="bio"
                        value={bio}
                        onChange={onChange}
                        disabled={disabled}
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        disabled={disabled}
                        autoComplete="off"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        disabled={disabled}
                      />
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">
                      Update Settings
                    </button>
                  </fieldset>
                  <hr />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onLogout}
                  >
                    Or click here to logout.
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
