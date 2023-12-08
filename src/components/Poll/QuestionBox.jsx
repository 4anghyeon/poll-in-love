import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import {TYPE} from '../../redux/modules/enrollSlice';
import {ColumnCenter, Input} from '../../styles/CommonStyles';

const QuestionBox = ({question, index, setAnswer}) => {
  const onChangeInput = e => {
    setAnswer(prev => {
      const newAnswer = {...prev};
      const question = newAnswer.questions[index];
      question.check = e.target.value !== '';
      question.answer = e.target.value;
      newAnswer.questions.splice(index, 1, question);
      return newAnswer;
    });
  };

  return (
    <StQuestionBoxContainer>
      <StQuestionContainer>
        <h1>
          질문 {index + 1}. {question.question}
        </h1>
        {question.type === TYPE.INPUT && <StAnswerInput placeholder="답변을 입력해주세요." onChange={onChangeInput} />}
        {question.type === TYPE.SELECT && (
          <StRadioButtonContainer>
            {question.answers.map(data => {
              return (
                <label key={data.id}>
                  <input type="radio" name={question.id} value={`${data.answer}`} onChange={onChangeInput} />
                  <span>{data.answer}</span>
                </label>
              );
            })}
          </StRadioButtonContainer>
        )}
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

const StRadioButtonContainer = styled.div`
  ${ColumnCenter};
  align-items: flex-start;
  margin-top: 10px;
  & label {
    margin-bottom: 10px;
  }
`;
