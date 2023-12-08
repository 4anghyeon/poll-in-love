import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar} from 'react-icons/rx';
import {NavLink} from '../../../node_modules/react-router-dom/dist/index';
import theme from 'styles/theme';
import {auth} from 'shared/firebase/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {collection, getDocs, query, where, getDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import {Button} from 'styles/CommonStyles';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail} from 'api/users';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(auth.currentUser.email),
  });

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
        <StDiv>
          <span>{user?.nickname}님 반갑습니다!</span>
          <NavLink to={`/mypage/${user?.id}`}>
            <RxAvatar size="45" color="white" />
          </NavLink>
          <Button onClick={logOutUser}>로그아웃</Button>
        </StDiv>
      ) : (
        <StDiv>
          <Button onClick={() => navigate('/login')}>로그인</Button>
          <Button onClick={() => navigate('/signup')}>회원가입</Button>
        </StDiv>
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

const StDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
