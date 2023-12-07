import React from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import UserAnswerFormBox from './UserAnswerFormBox';
import theme from '../../../styles/theme';
import Select from '../../Common/Select';
import {changeRowQuestionTitle, changeRowQuestionType, removeQuestion, TYPE} from '../../../redux/modules/enrollSlice';
import {useDispatch} from 'react-redux';
import {MdRemoveCircleOutline} from 'react-icons/md';

const options = [
  {
    value: TYPE.INPUT,
    text: '사용자 입력',
  },
  {
    value: TYPE.SELECT,
    text: '사용자 선택',
  },
];

const PollFormBox = ({index, question}) => {
  const dispatch = useDispatch();

  const onChangeQuestion = e => {
    dispatch(changeRowQuestionTitle({index: index, value: e.target.value}));
  };

  const onChangeSelect = e => {
    dispatch(changeRowQuestionType({index: index, type: e.target.value}));
  };

  const onClickRemoveQuestion = () => {
    dispatch(removeQuestion({index: index}));
  };

  return (
    <StContainer>
      <StTitleContainer>
        <h1>{index + 1}번 질문</h1>
        {index !== 0 && <MdRemoveCircleOutline onClick={onClickRemoveQuestion} />}
      </StTitleContainer>
      <input onChange={onChangeQuestion} placeholder={'질문을 입력해 주세요'} autoFocus={question.question === ''} />
      <label>
        답변 타입 <Select options={options} onChangeSelect={onChangeSelect} />
      </label>
      {question.type === TYPE.SELECT && <UserAnswerFormBox question={question} index={index} />}
    </StContainer>
  );
};

export default PollFormBox;

const StContainer = styled.section`
  ${() => ColumnCenter};

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

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

const StTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
    color: ${theme.COLOR.pink};
  }
`;
