import React, {useState} from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../styles/CommonStyles';
import theme from '../styles/theme';
import QuestionBox from '../components/Poll/QuestionBox';

const fakeData = {
  createDate: new Date(),
  title: '가장 맛있는 음식은?',
  questions: [
    {
      id: '123',
      question: '분식 중에서',
      type: 'input',
    },
    {
      id: '1234',
      question: '다음 메뉴 중에서',
      type: 'select',
      answers: ['떡볶이', '만두', '라면'],
    },
  ],
  writer: '이상현',
  thumbnail: null,
};

const PollPage = () => {
  const [checkAnswers, setCheckAnswers] = useState([]);
  const progressPercent = (checkAnswers.length / (fakeData.questions.length || 1)) * 100;
  console.log(progressPercent);

  return (
    <StPollPageContainer>
      <StPollContainer>
        <StPollHeader>
          <h1>{fakeData.title}</h1>
          <StProgressBar $percent={progressPercent}>
            ({checkAnswers.length}/{fakeData.questions.length}개)
          </StProgressBar>
        </StPollHeader>
        <StQuestionContainer>
          {fakeData.questions.map((question, index) => (
            <QuestionBox key={question.id} index={index} question={question} />
          ))}
        </StQuestionContainer>
      </StPollContainer>
    </StPollPageContainer>
  );
};

export default PollPage;

const StPollPageContainer = styled.article`
  ${ColumnCenter};
  width: 100%;
  height: 100%;
`;

const StPollContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
`;

const StPollHeader = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 20px;

  & h1 {
    font-size: ${theme.FONT_SIZE.xl};
  }
`;

const StProgressBar = styled.div`
  margin-top: 20px;
  padding: 5px;
  font-weight: bold;

  border: 2px solid ${theme.COLOR.pink};
  border-radius: 10px;
  background: linear-gradient(
    to right,
    rgb(255, 173, 199) 0% ${({$percent}) => $percent}%,
    rgb(255, 255, 255) ${({$percent}) => $percent}%
  );
`;

const StQuestionContainer = styled.div`
  margin-top: 20px;
`;
