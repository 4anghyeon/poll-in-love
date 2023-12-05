import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import UserAnswerInputRow from './UserAnswerInputRow';
import styled from 'styled-components';
import {Button} from '../../../styles/CommonStyles';

class UserAnswer {
  constructor() {
    this.id = uuidv4();
    this.answer = '';
  }
}

const UserAnswerFormBox = ({question, setQuestions}) => {
  const {answers} = question;

  const addUserAnswer = () => {
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id !== question.id) return q;
        return {
          ...q,
          answers: [...q.answers, new UserAnswer()],
        };
      });
    });
  };

  useEffect(() => {
    if (answers.length === 0) {
      addUserAnswer();
    }
  }, []);

  return (
    <>
      {answers.map((answer, i) => (
        <UserAnswerInputRow key={answer.id} index={i} question={question} setQuestions={setQuestions} />
      ))}
      <StAddAnswerButton onClick={addUserAnswer}>답변 추가</StAddAnswerButton>
    </>
  );
};

export default UserAnswerFormBox;

const StAddAnswerButton = styled(Button)`
  margin-top: 10px;
  font-size: 0.9rem;
`;
