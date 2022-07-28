import { Routes, Route, HashRouter } from "react-router-dom";

import Header from "@/components/Header";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import Editor from "@/pages/Editor";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Profile/Favorites";
import Footer from "@/components/Footer";
import PrivateRoute from "@/lib/PrivateRoute";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/@:userId" element={<Profile />} />
        <Route path="/@:userId/favorites" element={<Favorites />} />
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="settings" element={<Settings />} />
          <Route path="editor" element={<Editor />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
