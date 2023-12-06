import React from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import UserAnswerFormBox from './UserAnswerFormBox';
import theme from '../../../styles/theme';
import Select from '../../Common/Select';
import {changeRowQuestionTitle, changeRowQuestionType, TYPE} from '../../../redux/modules/enrollSlice';
import {useDispatch} from 'react-redux';

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

  return (
    <StContainer>
      <h1>{index}번 질문</h1>
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

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;
