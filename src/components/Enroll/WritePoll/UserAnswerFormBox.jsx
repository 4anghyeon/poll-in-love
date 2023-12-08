import React, {useEffect} from 'react';
import UserAnswerInputRow from './UserAnswerInputRow';
import styled from 'styled-components';
import {Button} from '../../../styles/CommonStyles';
import {addRowQuestionAnswer} from '../../../redux/modules/enrollSlice';
import {useDispatch} from 'react-redux';

const UserAnswerFormBox = ({question, index}) => {
  const {answers} = question;
  const dispatch = useDispatch();

  const addUserAnswer = () => {
    dispatch(addRowQuestionAnswer({index}));
  };

  useEffect(() => {
    if (answers.length === 0) {
      addUserAnswer();
    }
  }, []);

  return (
    <>
      {answers.map((answer, i) => (
        <UserAnswerInputRow key={answer.id} index={index} answerIndex={i} />
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
