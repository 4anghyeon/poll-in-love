import React from 'react';
import styled from 'styled-components';
import {RowCenter} from '../../../styles/CommonStyles';
import {useDispatch} from 'react-redux';
import {changeRowQuestionAnswer, removeRowQuestionAnswer} from '../../../redux/modules/enrollSlice';
import {MdRemoveCircleOutline} from 'react-icons/md';
import theme from '../../../styles/theme';

const UserAnswerInputRow = ({index, answerIndex}) => {
  const dispatch = useDispatch();
  const onChangeAnswer = e => {
    dispatch(changeRowQuestionAnswer({index, answerIndex, value: e.target.value}));
  };

  const onClickDeleteAnswer = () => {
    dispatch(removeRowQuestionAnswer({index, answerIndex}));
  };

  return (
    <RowContainer>
      <input placeholder={`${answerIndex + 1}번 답변을 입력하여 주세요.`} onChange={onChangeAnswer} />
      {answerIndex === 0 ? <div></div> : <MdRemoveCircleOutline onClick={onClickDeleteAnswer} />}
    </RowContainer>
  );
};

export default UserAnswerInputRow;

const RowContainer = styled.div`
  ${() => RowCenter};
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;

  & > div {
    width: 1.6rem;
  }

  & input {
    height: 45px;
    margin-right: 20px;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
    color: ${theme.COLOR.pink};
  }
`;
