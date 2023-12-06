import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter} from '../styles/CommonStyles';
import theme from '../styles/theme';
import QuestionBox from '../components/Poll/QuestionBox';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addParticipant, findParticipantByPollId, findParticipantByPollIdAndUserId} from '../api/participants';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const fakeData = {
  id: 'sdfsdfdsf',
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
      answers: [
        {id: '123213', answer: '떡볶이'},
        {id: '1asd23213', answer: '라면'},
        {id: '1232asd13', answer: '김밥'},
      ],
    },
  ],
  writer: '이상현',
  thumbnail: null,
};

const PollPage = () => {
  const [answer, setAnswer] = useState({...fakeData});
  const navigate = useNavigate();

  const count = answer.questions.map(q => q.check === true).filter(q => q).length;
  const progressPercent = (count / (fakeData.questions.length || 1)) * 100;

  const {isPending: isParticipantPending, data: participants} = useQuery({
    queryKey: ['poll', fakeData.id],
    queryFn: findParticipantByPollIdAndUserId.bind(null, fakeData.id, fakeData.writer),
  });

  const {
    isPending,
    isSuccess,
    mutate: addAnswerMutation,
  } = useMutation({
    mutationFn: newParticipant => {
      console.log(newParticipant);
      return addParticipant(newParticipant);
    },
  });

  const onClickSubmitButton = () => {
    const answers = answer.questions.map(q => q.answer);
    addAnswerMutation({pollId: fakeData.id, participant: fakeData.writer, answers});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('설문에 참여해주셔서 감사합니다!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/');
    }
  }, [isSuccess]);

  if (isParticipantPending) return <p>로딩 중...</p>;

  return (
    <StPollPageContainer>
      <StPollContainer>
        <StPollHeader>
          <h1>{fakeData.title}</h1>
          <StProgressBar $percent={progressPercent}>
            ({count}/{fakeData.questions.length}개)
          </StProgressBar>
        </StPollHeader>
        <StQuestionContainer>
          {fakeData.questions.map((question, index) => (
            <QuestionBox key={question.id} index={index} question={question} setAnswer={setAnswer} />
          ))}
        </StQuestionContainer>
        {participants.length > 0 ? (
          <StSubmitButton disabled={true}>이미 완료한 설문입니다.</StSubmitButton>
        ) : (
          <StSubmitButton onClick={onClickSubmitButton} disabled={isPending || progressPercent !== 100}>
            제출
          </StSubmitButton>
        )}
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

const StSubmitButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;
