import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { getUser, putUser } from "@/api/user";

const Settings = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getSettings = useCallback(async () => {
    try {
      const data = await (
        await getUser("/user", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      ).data;
      const user = data.user;
      setImage(user.image);
      setUsername(user.username);
      setBio(user.bio);
      setEmail(user.email);
      setPassword(user.password);
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  }, [token]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  const updateSettings = async () => {
    try {
      const data = await (
        await putUser(
          "/user",
          {
            user: {
              image: image,
              username: username,
              bio: bio,
              email: email,
              password: password,
            },
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
      ).data;
      console.log(data.user);
      navigate(`/profile/:${username}`);
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  };

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
                      defaultValue={image}
                      onChange={(event) => setImage(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      defaultValue={bio}
                      onChange={(event) => setBio(event.target.value)}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={updateSettings}
                  >
                    Update Settings
                  </button>
                </fieldset>
                <hr />
                <button className="btn btn-outline-danger" onClick={onLogout}>
                  Or click here to logout.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
