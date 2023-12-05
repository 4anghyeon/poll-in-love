import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../styles/CommonStyles';

const Footer = () => {
  return (
    <StFooter>
      <p>
        Copyright 203. <strong>Hot 6</strong> All rights reserved.
      </p>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  ${() => RowCenter}
  height: 50px;
  background-color: #caadff;
  font-size: 0.8rem;
  color: white;
`;
