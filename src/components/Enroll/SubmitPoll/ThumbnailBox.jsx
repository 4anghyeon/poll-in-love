import React from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';

const ThumbnailBox = () => {
  return (
    <StThumbnailContainer>
      <h1>썸네일을 업로드 하세요</h1>
      <figure>
        <img src={'https://newsimg.sedaily.com/2022/12/12/26EVH8FI5Z_1.jpg'} alt="thumbnail" />
        <label>
          <input type="file" />
          <span>썸네일 업로드</span>
        </label>
      </figure>
    </StThumbnailContainer>
  );
};

export default ThumbnailBox;

const StThumbnailContainer = styled.div`
  ${() => ColumnCenter};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  & h1 {
    margin: 20px 0 20px 0;
    font-size: ${theme.FONT_SIZE.xl};
    width: 100%;
  }

  & input {
    display: none;
  }

  & figure {
    width: 100%;
    height: 100%;
    max-width: 500px;
    padding-right: 5rem;
    ${ColumnCenter}
  }

  & img {
    border: 1px solid ${theme.COLOR.pink};
    border-radius: 10px 10px 0 0;
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

  @media screen and (max-width: 768px) {
    & {
    }
    figure {
      width: 100%;
      align-items: center;
      padding-right: 0;
    }
  }
`;
