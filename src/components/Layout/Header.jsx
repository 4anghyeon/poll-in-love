import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar} from 'react-icons/rx';
import {NavLink} from '../../../node_modules/react-router-dom/dist/index';
import theme from 'styles/theme';
import {auth, db} from 'shared/firebase/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {Button} from 'styles/CommonStyles';

const Header = () => {
  // console.log('auth', auth.currentUser.uid);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('user', user); // user 정보 없으면 null 표시
      setCurrentUser(user);
    });
  }, []);

  const logOutUser = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <StHeader>
      <NavLink to="/">
        <img src={logo} width={300} height={40} alt="logo" />
      </NavLink>
      {currentUser ? (
        <>
          <NavLink to={`/mypage/${auth.currentUser.uid}`}>
            <RxAvatar size="45" color="white" />
          </NavLink>
          <Button onClick={logOutUser}>로그아웃</Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate('/login')}>로그인</Button>
          <Button onClick={() => navigate('/signup')}>회원가입</Button>
        </>
      )}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  background-color: ${theme.COLOR.purple};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
