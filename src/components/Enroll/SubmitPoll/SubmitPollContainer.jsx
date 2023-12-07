import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';
import ThumbnailBox from './ThumbnailBox';
import AdditionalInfoBox from './AdditionalInfoBox';

// 만든 설문조사 제출
// 제목, 포인트, 썸네일 입력
const SubmitPollContainer = forwardRef(({setNowForm, setImgFile}, ref) => {
  return (
    <StContainer>
      <input placeholder={'설문 제목을 입력해 주세요'} ref={ref} />
      <StDescriptionContainer>
        <ThumbnailBox setImgFile={setImgFile} />
        <AdditionalInfoBox />
      </StDescriptionContainer>
    </StContainer>
  );
});

export default SubmitPollContainer;

const StContainer = styled.div`
  ${() => ColumnCenter};
  justify-content: space-evenly;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 100%;
  padding: 0 10rem 0 10rem;

  & input {
    width: 100%;
    padding: 20px;
    height: 60px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid ${() => theme.COLOR.lightPink};
  }

  & input:first-child {
    font-size: ${theme.FONT_SIZE.xl};
    border: 1px solid ${() => theme.COLOR.pink};
  }

  @media screen and (max-width: 768px) {
    & {
      padding: 0;
    }
  }
`;

const StDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  width: 100%;
  justify-content: space-around;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    & {
      grid-template-columns: 1fr; /* 1개의 열로 구성 */
    }
  }
`;
