import { useEffect } from "react";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import EditArticle from "./pages/EditArticle";
import NewArticle from "./pages/NewArticle";

import Header from "./components/header/Header";
import Footer from "./components/Footer";
import MyArticle from "./components/profile/MyArticle";
import FavoritedArticle from "./components/profile/FavoritedArticle";

import { getUser } from "./api/user";
import { isLoggedInState, userState } from "./state";

const App = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const initUser = async () => {
      const { user } = await getUser("/user");
      const { email, username, bio, image } = user;
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
  }, [setIsLoggedIn, setUser]);

  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:URLSlug" element={<Article />} />
          <Route path="/editor" element={<NewArticle />} />
          <Route path="/editor/:URLSlug" element={<EditArticle />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId" element={<Profile />}>
            <Route path="" element={<MyArticle />} />
            <Route path="favorites" element={<FavoritedArticle />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
