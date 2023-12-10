import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar, RxHamburgerMenu} from 'react-icons/rx';
import {BsShop} from 'react-icons/bs';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import theme from 'styles/theme';
import {auth} from 'shared/firebase/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {Button, RowCenter} from 'styles/CommonStyles';
import {useQuery} from '@tanstack/react-query';
import {getUserByEmail} from 'api/users';
import {MdOutlineAddChart} from 'react-icons/md';
import {TbLogout} from 'react-icons/tb';

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
                <StContextMenuRow>
                  <RxAvatar />
                  마이 페이지
                </StContextMenuRow>
              </Link>
              <Link to="/enroll">
                <StContextMenuRow>
                  <MdOutlineAddChart />
                  설문 등록
                </StContextMenuRow>
              </Link>
              <Link to="/shop">
                <StContextMenuRow>
                  <BsShop />
                  포인트 상점
                </StContextMenuRow>
              </Link>
              <StContextMenuRow onClick={logOutUser}>
                <TbLogout />
                로그아웃
              </StContextMenuRow>
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

    @media (max-width: 768px) {
      display: none;
    }

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
  top: 55px;
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

const StContextMenuRow = styled.li`
  ${RowCenter};
  justify-content: flex-start;
  svg {
    margin-right: 5px;
  }
  cursor: pointer;
`;
