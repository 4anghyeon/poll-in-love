import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

/**
 * 커스텀 Select Element
 * @param options
 * - [{value: 값, text: 표시 문자열}]
 * @param onChangeSelect
 *  - 값 변화시 일어날 이벤트
 * @param defaultValue
 * - 기본 선택 값 (선택)
 * @returns {Element}
 */
const Select = ({options = [], onChangeSelect, defaultValue}) => {
  return (
    <StSelectContainer>
      <select onChange={onChangeSelect} value={defaultValue}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </StSelectContainer>
  );
};

export default Select;

const StSelectContainer = styled.div`
  position: relative;

  & select {
    appearance: none;
    -webkit-appearance: none;

    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 2em 0.675em 1em;
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
