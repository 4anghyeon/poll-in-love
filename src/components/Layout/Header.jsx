import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar} from 'react-icons/rx';
import {NavLink} from '../../../node_modules/react-router-dom/dist/index';
import theme from 'styles/theme';

const Header = () => {
  return (
    <StHeader>
      <NavLink to="/">
        <img src={logo} width={300} height={40} alt="logo" />
      </NavLink>
      <NavLink to="/mypage">
        <RxAvatar size="45" color="white" />
      </NavLink>
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
