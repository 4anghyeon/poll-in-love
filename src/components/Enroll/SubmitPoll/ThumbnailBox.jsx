import React from 'react';
import styled from 'styled-components';
import {ColumnCenter, RowCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';

const ThumbnailBox = () => {
  return (
    <StThumbnailContainer>
      <figure>
        <img src={'https://newsimg.sedaily.com/2022/12/12/26EVH8FI5Z_1.jpg'} alt="thumbnail" />
        <label>
          <input type="file" />
          <span>업로드</span>
        </label>
      </figure>
    </StThumbnailContainer>
  );
};

export default ThumbnailBox;

const StThumbnailContainer = styled.div`
  ${() => ColumnCenter}

  width: 100%;

  & input {
    display: none;
  }

  & figure {
    width: 70%;
    text-align: center;
    ${ColumnCenter}
  }

  & img {
    border: 1px solid ${theme.COLOR.pink};
    width: 100%;
  }

  & label {
    width: 100%;
    text-align: center;
    background: ${theme.COLOR.purple};
    color: white;
    font-size: ${theme.FONT_SIZE.base};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    border-radius: 0 0 10px 10px;
  }
`;
