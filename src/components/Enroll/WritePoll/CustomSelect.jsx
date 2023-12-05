import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const CustomSelect = ({question, setQuestions}) => {
  const onChangeSelect = e => {
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id !== question.id) return q;
        return {
          ...q,
          type: e.target.value,
        };
      });
    });
  };
  return (
    <StSelectContainer>
      <select onChange={onChangeSelect} value={question.type}>
        <option value="input">사용자 입력</option>
        <option value="select">사용자 선택</option>
      </select>
    </StSelectContainer>
  );
};

export default CustomSelect;

const StSelectContainer = styled.div`
  min-width: 350px;
  position: relative;

  & select {
    appearance: none;
    -webkit-appearance: none;

    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 6em 0.675em 1em;
    background-color: #fff;
    border: 1px solid ${() => theme.COLOR.lightPink};
    border-radius: 10px;
    color: #000;
    cursor: pointer;
  }

  &::before,
  &::after {
    --size: 0.3rem;
    content: '';
    position: absolute;
    right: 1rem;
    pointer-events: none;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid black;
    top: 45%;
  }
`;
