import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';
import Settings from './pages/Settings';
import NewArticle from './pages/NewArticle';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editor" element={<NewArticle />} />
      </Routes>
    </HashRouter>
  );
}
