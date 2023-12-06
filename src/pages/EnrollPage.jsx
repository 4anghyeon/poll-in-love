import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from '../styles/CommonStyles';
import WritePollContainer from '../components/Enroll/WritePoll/WritePollContainer';
import SubmitPollContainer from '../components/Enroll/SubmitPoll/SubmitPollContainer';
import theme from '../styles/theme';
import {useDispatch} from 'react-redux';
import {init} from '../redux/modules/enrollSlice';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl';

const SUBMIT = 'submit';
const WRITE = 'write';

const EnrollPage = () => {
  const [nowForm, setNowForm] = useState(WRITE);
  const dispatch = useDispatch();

  const onClickNextForm = () => {
    setNowForm(SUBMIT);
  };

  const onClickPreviousForm = () => {
    setNowForm(WRITE);
  };

  useEffect(() => {
    // 등록 페이지로 들어오면 Form 전부 초기화
    dispatch(init());
  }, []);

  return (
    <StEnrollContainer>
      <StContentContainer $nowForm={nowForm}>
        <WritePollContainer />
        <SubmitPollContainer />
      </StContentContainer>

      <StButtonContainer>
        {nowForm === SUBMIT ? (
          <Button onClick={onClickPreviousForm} $bgColor={theme.COLOR.pink}>
            <SlArrowLeft />
            이전
          </Button>
        ) : (
          <div></div>
        )}
        {nowForm === WRITE ? (
          <Button onClick={onClickNextForm} $bgColor={theme.COLOR.pink}>
            다음
            <SlArrowRight />
          </Button>
        ) : (
          <div></div>
        )}
      </StButtonContainer>
    </StEnrollContainer>
  );
};

export default EnrollPage;

const StEnrollContainer = styled.div`
  ${() => ColumnCenter};

  width: 80%;
  height: 90%;
`;

const StContentContainer = styled.section`
  ${() => RowCenter};
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  & > div {
    transform: translateX(${({$nowForm}) => ($nowForm === WRITE ? '0' : '-100%')});
  }
`;

const StButtonContainer = styled.div`
  ${() => RowCenter};
  width: 80%;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${() => theme.COLOR.lightPink};
  justify-content: center;
`;
