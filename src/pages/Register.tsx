import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "@/components/Header/Header";
import { postUser } from "@/api/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const onRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
      const user = data.user;
      localStorage.setItem("token", user.token);
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error.response.data.errors;
      setError({
        email: errorMessage.email,
        username: errorMessage.username,
        password: errorMessage.password,
      });
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
                <Link to="/login" className="text-xs-center">
                  Have an account?
                </Link>
              </p>

              <ul className="error-messages">
                {error.email && <li>email {error.email}</li>}
                {error.username && <li>username {error.username}</li>}
                {error.password && <li>password {error.password}</li>}
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
