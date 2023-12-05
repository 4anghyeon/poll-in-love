import React from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import CustomSelect from './CustomSelect';
import UserAnswerFormBox from './UserAnswerFormBox';
import theme from '../../../styles/theme';

const PollFormBox = ({index, question, setQuestions}) => {
  const onChangeQuestion = e => {
    // todo: 로직 중복
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id !== question.id) return q;
        return {
          ...q,
          question: e.target.value,
        };
      });
    });
  };

  return (
    <StContainer>
      <h1>{index}번 질문</h1>

      <input value={question.question} onChange={onChangeQuestion} placeholder={'질문을 입력해 주세요'} />
      <label>
        답변 타입 <CustomSelect question={question} setQuestions={setQuestions} />
      </label>
      {question.type === 'select' && <UserAnswerFormBox question={question} setQuestions={setQuestions} />}
    </StContainer>
  );
};

export default PollFormBox;

const StContainer = styled.section`
  ${() => ColumnCenter};
  h1 {
    margin-bottom: 20px;
  }
  width: 50%;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${() => theme.COLOR.pink};
  border-radius: 10px;
  align-items: flex-start;

  & input {
    width: 100%;
    padding: 20px;
    height: 60px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid ${() => theme.COLOR.lightPink};
  }

  & label {
    display: flex;
    align-items: center;
    margin-top: 20px;

    div {
      margin-left: 10px;
    }
  }
`;
