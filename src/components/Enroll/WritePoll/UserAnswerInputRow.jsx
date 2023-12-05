import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../../styles/CommonStyles';

const UserAnswerInputRow = ({index, question, setQuestions}) => {
  const onChangeAnswer = e => {
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id !== question.id) return q;
        else {
          const answers = [...q.answers];
          answers[index].answer = e.target.value;
          q.answers = answers;
          return q;
        }
      });
    });
  };
  return (
    <RowContainer>
      <input placeholder={`${index + 1}번 답변을 입력하여 주세요.`} onChange={onChangeAnswer} />
    </RowContainer>
  );
};

export default UserAnswerInputRow;

const RowContainer = styled.div`
  ${() => RowCenter};
  width: 100%;
  margin-top: 10px;

  & input {
    height: 45px;
  }
`;
