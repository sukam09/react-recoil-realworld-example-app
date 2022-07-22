import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { putUser } from "../api/user";

const Settings = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);

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
              Authorization: `Token ${user.token}`,
            },
          }
        )
      ).data;
      console.log(data.user);
      navigate(`/profile/:${user.username}`);
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
                      defaultValue={user.image}
                      onChange={(event) => setImage(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={user.username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      defaultValue={user.bio}
                      onChange={(event) => setBio(event.target.value)}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={user.email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      defaultValue={user.password}
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
