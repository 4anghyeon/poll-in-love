import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import EnrollPage from '../pages/EnrollPage';
import ShopPage from 'pages/ShopPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import PollPage from '../pages/PollPage';
import {getPollById} from '../api/polls';
import MyPage from 'pages/MyPage';
import {auth} from './firebase/firebase';
import {toast} from 'react-toastify';
import TOAST_OPTION from '../utils/toast-option';

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
        loader: ({params}) => {
          if (!auth.currentUser) {
            toast.error('로그인 후 이용할 수 있습니다!', TOAST_OPTION);
            return redirect('/login');
          }
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
