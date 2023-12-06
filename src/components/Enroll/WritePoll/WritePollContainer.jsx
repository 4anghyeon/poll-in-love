import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter} from '../../../styles/CommonStyles';
import PollFormBox from './PollFormBox';
import {addQuestion} from '../../../redux/modules/enrollSlice';
import {useDispatch, useSelector} from 'react-redux';

// 설문조사 생성
const WritePollContainer = () => {
  const containerRef = useRef(null);
  const {questions} = useSelector(state => state.enroll);
  const dispatch = useDispatch();

  // 질문 추가 버튼 클릭
  const onClickAddQuestion = () => {
    dispatch(addQuestion());
  };

  // 질문 목록이 늘어날 때 스크롤 맨 아래로
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [questions.length]);

  return (
    <StContainer ref={containerRef}>
      {questions.map((q, i) => {
        return <PollFormBox key={q.id} index={i + 1} question={q} />;
      })}
      <StAddButton onClick={onClickAddQuestion}>질문 추가</StAddButton>
    </StContainer>
  );
};

export default WritePollContainer;

const StContainer = styled.div`
  ${() => ColumnCenter};
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const StAddButton = styled(Button)`
  padding: 10px;
`;
