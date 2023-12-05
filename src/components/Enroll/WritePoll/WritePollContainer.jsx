import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter} from '../../../styles/CommonStyles';
import PollFormBox from './PollFormBox';
import {Poll} from '../../../pages/EnrollPage';

// 설문조사 생성
const WritePollContainer = ({questions, setQuestions}) => {
  const containerRef = useRef(null);

  const onClickAddQuestion = () => {
    setQuestions(prev => [...prev, new Poll()]);
  };

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [questions.length]);

  return (
    <StContainer ref={containerRef}>
      {questions.map((q, i) => {
        return (
          <PollFormBox key={q.id} index={i + 1} question={q} setQuestions={setQuestions}>
            <input placeholder={'질문을 입력해 주세요'} />
          </PollFormBox>
        );
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
  width: 100px;
  padding: 10px;
`;
