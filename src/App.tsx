import { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Header from "./components/header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import EditArticle from "./pages/EditArticle";
import NewArticle from "./pages/NewArticle";

import { getUser } from "./api/user";
import { isLoggedInState, userState } from "./state";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./routes/NotFound";

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
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/:userId/favorites" element={<Favorites />} />
          <Route path="/article/:URLSlug" element={<Article />} />
          {/* TODO: authentication should be checked */}
          <Route path="/editor" element={<NewArticle />} />
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/editor/:URLSlug" element={<EditArticle />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
