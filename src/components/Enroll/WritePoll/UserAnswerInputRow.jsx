import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../../styles/CommonStyles';
import {useDispatch} from 'react-redux';
import {changeRowQuestionAnswer} from '../../../redux/modules/enrollSlice';

const UserAnswerInputRow = ({index, answerIndex}) => {
  const dispatch = useDispatch();
  const onChangeAnswer = e => {
    dispatch(changeRowQuestionAnswer({index, answerIndex, value: e.target.value}));
  };
  return (
    <RowContainer>
      <input placeholder={`${answerIndex + 1}번 답변을 입력하여 주세요.`} onChange={onChangeAnswer} />
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
