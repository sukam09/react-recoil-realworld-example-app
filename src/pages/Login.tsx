import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import { postUserLogin } from "../api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(undefined);
  const navigate = useNavigate();

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await (
        await postUserLogin("/users/login", {
          user: {
            email: `${email}`,
            password: `${password}`,
          },
        })
      ).data;
      const user = data.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error.response.data.errors;
      setEmailError(errorMessage.email);
      setPasswordError(errorMessage.password);
      setEmailOrPasswordError(errorMessage["email or password"]);
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
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register" className="text-xs-center">
                  Need an account?
                </Link>
              </p>

              <ul className="error-messages">
                {emailError && <li>email can't be blank</li>}
                {passwordError && <li>password can'be blank</li>}
                {emailOrPasswordError && <li>email or password is invalid</li>}
              </ul>

              <form>
                <fieldset className="form-group">
                  {/* FIXME: email type is not applied */}
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
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={(event) => onLogin(event)}
                  disabled={disabled}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
