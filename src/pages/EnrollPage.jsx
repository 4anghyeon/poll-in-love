import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from '../styles/CommonStyles';
import WritePollContainer from '../components/Enroll/WritePoll/WritePollContainer';
import SubmitPollContainer from '../components/Enroll/SubmitPoll/SubmitPollContainer';
import {v4 as uuidv4} from 'uuid';
import theme from '../styles/theme';

const SUBMIT = 'submit';
const WRITE = 'write';

export class Poll {
  constructor() {
    this.id = uuidv4();
    this.question = '';
    this.type = 'input';
    this.answers = [];
  }
}

const EnrollPage = () => {
  const [nowForm, setNowForm] = useState(WRITE);
  const [questions, setQuestions] = useState([new Poll()]);

  const onClickNextForm = () => {
    setNowForm(SUBMIT);
  };

  const onClickPreviousForm = () => {
    setNowForm(WRITE);
  };

  return (
    <StEnrollContainer>
      <StContentContainer $nowForm={nowForm}>
        <WritePollContainer questions={questions} setQuestions={setQuestions} />
        <SubmitPollContainer />
      </StContentContainer>

      <StButtonContainer>
        {nowForm === SUBMIT ? <Button onClick={onClickPreviousForm}>이전</Button> : <div></div>}
        {nowForm === WRITE ? <Button onClick={onClickNextForm}>다음</Button> : <div></div>}
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
  overflow-x: hidden;

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
