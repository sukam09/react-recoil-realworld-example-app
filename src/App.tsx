import { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Header from "@components/Header";
import Footer from "@components/Footer";
import { NotFound, PrivateRoute } from "@components/Routes";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Settings from "@pages/Settings";
import Editor from "@pages/Editor";
import { Profile, Favorites } from "@pages/Profile";
import Article from "@pages/Article";

import { getUser } from "@api/user";
import { isLoggedInState, userState } from "@store/state";

const App = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const initUser = async () => {
      const data = await getUser("/user");
      const { email, username, bio, image } = data.user;
      setUser({
        email: email,
        username: username,
        bio: bio,
        image: image,
      });
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      initUser();
    }
  }, [setUser, setIsLoggedIn]);

  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/profile/:userID/favorites" element={<Favorites />} />
          <Route path="/article/:URLSlug" element={<Article />} />
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/editor" element={<Editor />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
