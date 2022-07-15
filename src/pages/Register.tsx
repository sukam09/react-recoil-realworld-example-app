import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Header from "../components/Header";
import { postUser } from "../api/user";
import { User } from "../store/atom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [usernameError, setUsernameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const setUser = useSetRecoilState(User);
  const navigate = useNavigate();

  const onRegister = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await (
        await postUser("/users", {
          user: {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
          },
        })
      ).data;
      setUser({
        email: data.email,
        username: data.username,
        bio: data.bio,
        image: data.image,
        token: data.token,
      });
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error.response.data.errors;
      setUsernameError(errorMessage.username);
      setEmailError(errorMessage.email);
      setPasswordError(errorMessage.password);
    }
    setDisabled(false);
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <NavLink to="/login" className="text-xs-center">
                  Have an account?
                </NavLink>
              </p>

              <ul className="error-messages">
                {emailError && <li>email {emailError}</li>}
                {usernameError && <li>username {usernameError}</li>}
                {passwordError && <li>password {passwordError}</li>}
              </ul>

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                    disabled={disabled}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={disabled}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={disabled}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={onRegister}
                  disabled={disabled}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
