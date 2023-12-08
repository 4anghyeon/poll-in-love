import React from 'react';
import styled from 'styled-components';
import Select from '../../Common/Select';
import {ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';
import {useChangeAdditionalInfo} from '../../../hooks/useChangeAdditionalInfo';
import {AGE_OPTIONS, DAYS, GENDER_OPTIONS, MONTHS} from '../../../utils/defaultValue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useSelector} from 'react-redux';

const locale = {
  localize: {
    day: n => DAYS[n],
    month: n => MONTHS[n],
  },
  formatLong: {
    date: () => 'yyyy년 MM월 dd일',
  },
};

const AdditionalInfoBox = () => {
  const {dueDate} = useSelector(state => state.enroll);
  const onChangePoint = useChangeAdditionalInfo('point');
  const onChangeAge = useChangeAdditionalInfo('age');
  const onChangeGender = useChangeAdditionalInfo('gender');
  const onChangeDate = useChangeAdditionalInfo('dueDate');

  return (
    <StInfoBoxContainer>
      <div>
        <h1>참여자 조건을 입력하세요</h1>
        <label>
          <span>나이</span>
          <Select options={AGE_OPTIONS} onChangeSelect={e => +onChangeAge(+e.target.value)} />
        </label>
        <label>
          <span>성별</span>
          <Select options={GENDER_OPTIONS} onChangeSelect={e => +onChangeGender(e.target.value)} />
        </label>
      </div>
      <div>
        <h1>설문에 참여하면 얻게 될 포인트를 입력하세요</h1>
        <input type="number" min={0} defaultValue={0} onChange={e => onChangePoint(+e.target.value)} />
      </div>
      <div>
        <h1>마감 기한을 입력하세요</h1>
        <DatePicker
          selected={dueDate}
          locale={locale}
          dateFormat={'yyyy년 MM월 dd일'}
          onChange={date => onChangeDate(date)}
        />
      </div>
    </StInfoBoxContainer>
  );
};

export default AdditionalInfoBox;

const StInfoBoxContainer = styled.div`
  ${ColumnCenter};
  height: 100%;
  justify-content: space-evenly;
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
