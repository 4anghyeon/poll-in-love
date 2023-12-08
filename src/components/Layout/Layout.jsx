import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import {RowCenter} from '../../styles/CommonStyles';

const Layout = () => {
  return (
    <>
      <Header />
      <StContent>
        <Outlet />
      </StContent>
      <Footer />
    </>
  );
};

export default Layout;

const StContent = styled.section`
  ${RowCenter};
  min-height: calc(100vh - 100px);
  padding-top: 80px;
`;
