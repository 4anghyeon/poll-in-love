import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../styles/CommonStyles';
import theme from 'styles/theme';

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
  font-size: ${theme.FONT_SIZE.sm};
  color: white;
  background-color: ${theme.COLOR.purple};
`;
