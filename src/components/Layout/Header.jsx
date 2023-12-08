import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar} from 'react-icons/rx';
import {RxHamburgerMenu} from 'react-icons/rx';
import {NavLink, Link} from 'react-router-dom';
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
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    document.addEventListener('click', () => setIsListVisible(false));
  }, []);

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(auth.currentUser.email),
  });

  const logOutUser = async () => {
    await signOut(auth);
    navigate('/');
  };

  const onClickAvatar = e => {
    e.stopPropagation();
    setIsListVisible(!isListVisible);
  };

  return (
    <StHeader>
      <NavLink to="/">
        <img src={logo} width={250} height={32} alt="logo" />
      </NavLink>
      {currentUser ? (
        <StDiv>
          <span>반가워요 {user?.nickname}님!</span>
          <StAvatar>
            <RxHamburgerMenu size="35" color="white" onClick={onClickAvatar} />
          </StAvatar>
          {isListVisible ? (
            <StList>
              <Link to={`/mypage/${user?.id}`}>
                <li>마이 페이지</li>
              </Link>
              <Link to="/enroll">
                <li>설문 등록</li>
              </Link>
              <Link to="/shop">
                <li>포인트 상점</li>
              </Link>
              <li onClick={logOutUser}>로그아웃</li>
            </StList>
          ) : null}
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
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  position: fixed;
  width: 100%;
  z-index: 999;
  box-shadow: 0px 5px 16px 0px #00000033;
`;

const StDiv = styled.div`
  & span {
    color: white;
    font-size: ${theme.FONT_SIZE.lg};
  }
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StList = styled.ul`
  position: absolute;
  z-index: 9999;
  background-color: whitesmoke;
  color: black;
  right: 3%;
  top: 55%;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px #00000033;
  & li {
    margin: 5px 0px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    font-size: ${theme.FONT_SIZE.lg};
    &:hover {
      color: white;
      background-color: ${theme.COLOR.pink};
    }
  }
`;

const StAvatar = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;
