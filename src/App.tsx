import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
