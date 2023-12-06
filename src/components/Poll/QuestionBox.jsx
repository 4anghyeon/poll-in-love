import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import {TYPE} from '../../redux/modules/enrollSlice';
import {Input} from '../../styles/CommonStyles';

const QuestionBox = ({question, index}) => {
  return (
    <StQuestionBoxContainer>
      <StQuestionContainer>
        <h1>
          질문 {index + 1}. {question.question}
        </h1>
        {question.type === TYPE.INPUT && <StAnswerInput placeholder="답변을 입력해주세요." />}
      </StQuestionContainer>
    </StQuestionBoxContainer>
  );
};

export default QuestionBox;

const StQuestionBoxContainer = styled.section`
  border: 2px solid ${theme.COLOR.purple};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StQuestionContainer = styled.div``;

const StAnswerInput = styled(Input)`
  height: 40px;
  margin-top: 10px;
`;
