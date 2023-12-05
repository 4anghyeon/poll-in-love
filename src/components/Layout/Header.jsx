import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../styles/CommonStyles';

const Header = () => {
  return (
    <StHeader>
      <h1>header</h1>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  ${() => RowCenter}
  height: 50px;
`;
