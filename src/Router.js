import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import List from './pages/List/List';
import MyPage from './pages/MyPage/MyPage';
import Campaign from './pages/Campaign/Campaign';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/campaign" element={<Campaign />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
