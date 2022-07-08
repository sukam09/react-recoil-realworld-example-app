import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Editor from './pages/Editor';

export default function App() {
  return (
    <HashRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </RecoilRoot>
    </HashRouter>
  );
}
