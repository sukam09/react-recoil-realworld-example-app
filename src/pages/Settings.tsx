import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { putUser } from '../api/user';
import { isLoggedInAtom, userAtom } from '../atom';

const Settings = () => {
  const [settings, setSettings] = useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  const { image, username, bio, email, password } = settings;
  const [disabled, setDisabled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [user, setUser] = useRecoilState(userAtom);
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
    try {
      const { user } = await putUser({
        user: {
          email: email,
          username: username,
          bio: bio,
          image: image,
          password: password,
        },
      });
      localStorage.setItem('jwtToken', user.token);
      setUser({
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image,
      });
      navigate(`/profile/${username}`);
    } catch (err: any) {}
    setDisabled(false);
  };

  const onLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUser({ email: '', username: '', bio: '', image: '' });
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const initSettings = () => {
      setSettings({
        ...user,
        password: '',
      });
    };
    initSettings();
  }, [user]);

  if (!isLoggedIn) navigate('/', { replace: true });

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
              <form onSubmit={event => updateSettings(event)}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
