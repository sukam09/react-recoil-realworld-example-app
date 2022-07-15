import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Header from "../components/Header";
import { postUserLogin } from "../api/user";
import { User } from "../store/atom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const setUser = useSetRecoilState(User);
  const navigate = useNavigate();

  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      setUser({
        email: data.email,
        username: data.username,
        bio: data.bio,
        image: data.image,
        token: data.token,
      }); // FIXME: recoil not update
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error.response.data.errors);
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
                <NavLink to="/register" className="text-xs-center">
                  Need an account?
                </NavLink>
              </p>

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
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
