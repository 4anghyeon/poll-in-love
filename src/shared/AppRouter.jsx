import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import EnrollPage from '../pages/EnrollPage';
import ShopPage from 'pages/ShopPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import PollPage from '../pages/PollPage';
import {getPollById} from '../api/polls';
import MyPage from 'pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        index: true,
        element: <HomePage />,
      },
      {
        // 마이페이지
        path: 'mypage/:id',
        element: <MyPage />,
      },
      {
        // 포인트 상점
        path: 'shop',
        element: <ShopPage />,
      },
      {
        // 설문 등록
        path: 'enroll',
        element: <EnrollPage />,
      },
      {
        // 설문 참여
        path: 'poll/:id',
        element: <PollPage />,
        loader: async ({params}) => {
          return getPollById(params.id);
        },
      },
    ],
  },
  {
    // 회원가입
    path: 'signup',
    element: <SignUpPage />,
  },
  {
    // 로그인
    path: 'login',
    element: <LoginPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
