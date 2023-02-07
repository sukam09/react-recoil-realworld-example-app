import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { loginUser } from '../api/user';
import { userAtom, isLoggedInAtom } from '../atom';

const Login = () => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const { email, password } = account;
  const [error, setError] = useState({
    email: '',
    password: '',
    emailOrPassword: '',
  });
  const [disabled, setDisabled] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await loginUser({
        user: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem('jwtToken', data.user.token);
      setIsLoggedIn(true);
      setUser(data.user);
      navigate('/', { replace: true });
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      setError({
        email: errorMessage.email,
        password: errorMessage.password,
        emailOrPassword: errorMessage['email or password'],
      });
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sign in — Conduit</title>
        </Helmet>
      </HelmetProvider>

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
                {error.email && <li>email can't be blank</li>}
                {error.password && <li>password can'be blank</li>}
                {error.emailOrPassword && <li>email or password is invalid</li>}
              </ul>

              <form onSubmit={event => onLogin(event)}>
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
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    disabled={disabled}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
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
