import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import EnrollPage from '../pages/EnrollPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          {/*회원가입*/}
          <Route path="/signup" element={<HomePage />}></Route>
          {/*로그인*/}
          <Route path="/login" element={<HomePage />}></Route>
          {/*마이페이지*/}
          <Route path="/mypage" element={<HomePage />}></Route>
          {/*포인트 상점*/}
          <Route path="/shop" element={<HomePage />}></Route>
          {/*설문 등록*/}
          <Route path="/enroll" element={<EnrollPage />}></Route>
          {/*설문 참여*/}
          <Route path="/poll" element={<HomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
