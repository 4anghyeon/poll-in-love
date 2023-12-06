import React from 'react';
import styled from 'styled-components';
import Select from '../../Common/Select';
import {ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';
import {useChangeAdditionalInfo} from '../../../hooks/useChangeAdditionalInfo';

const AGE_OPTIONS = [
  {value: 0, text: '상관 없음'},
  {value: 10, text: '10대'},
  {value: 20, text: '20대'},
  {value: 30, text: '30대'},
  {value: 40, text: '40대'},
  {value: 50, text: '50대'},
  {value: 60, text: '60대'},
  {value: 70, text: '70대'},
];

const GENDER_OPTIONS = [
  {value: 'none', text: '상관 없음'},
  {value: 'male', text: '남성'},
  {value: 'female', text: '여성'},
];

const AdditionalInfoBox = () => {
  const onChangePoint = useChangeAdditionalInfo('point');
  const onChangeAge = useChangeAdditionalInfo('age');
  const onChangeGender = useChangeAdditionalInfo('gender');

  return (
    <StInfoBoxContainer>
      <div>
        <h1>참여자 조건을 입력하세요</h1>
        <label>
          <span>나이</span>
          <Select options={AGE_OPTIONS} onChangeSelect={onChangeAge} />
        </label>
        <label>
          <span>성별</span>
          <Select options={GENDER_OPTIONS} onChangeSelect={onChangeGender} />
        </label>
      </div>

      <h1>설문에 참여하면 얻게 될 포인트를 입력하세요</h1>
      <input type="number" min={0} defaultValue={0} onChange={onChangePoint} />
    </StInfoBoxContainer>
  );
};

export default AdditionalInfoBox;

const StInfoBoxContainer = styled.div`
  ${ColumnCenter};
  height: 100%;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  & > div {
    width: 100%;
  }

  & h1 {
    font-size: ${theme.FONT_SIZE.xl};
    margin-top: 20px;
    margin-bottom: 20px;
  }

  & label {
    width: 100%;
    font-size: ${theme.FONT_SIZE.lg};
    & div {
      width: 100%;
      margin: 10px 0 30px 0;
    }
  }
`;
