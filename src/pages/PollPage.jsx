import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter} from '../styles/CommonStyles';
import theme from '../styles/theme';
import QuestionBox from '../components/Poll/QuestionBox';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addParticipant, findParticipantByPollIdAndUserId} from '../api/participants';
import {toast} from 'react-toastify';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';
import {updateUserPoint} from '../api/users';
import {auth} from '../shared/firebase/firebase';
import TOAST_OPTION from '../utils/toast-option';

const PollPage = () => {
  const poll = useLoaderData();
  const [answer, setAnswer] = useState({...poll});
  const navigate = useNavigate();

  const count = answer.questions.map(q => q.check === true).filter(q => q).length;
  const progressPercent = (count / (poll.questions.length || 1)) * 100;

  const {isPending: isParticipantPending, data: participants} = useQuery({
    queryKey: ['poll', poll.id],
    queryFn: findParticipantByPollIdAndUserId.bind(null, poll.id, poll.writer),
  });

  const {mutate: updatePoint} = useMutation({
    mutationFn: data => {
      return updateUserPoint(data.userId, data.point);
    },
  });

  const {
    isPending,
    isSuccess,
    mutate: addAnswer,
  } = useMutation({
    mutationFn: newParticipant => {
      return addParticipant(newParticipant);
    },
    onSuccess: () => {
      updatePoint({userId: auth.currentUser.email, point: +poll.point});
    },
  });

  const onClickSubmitButton = () => {
    const answers = answer.questions.map(q => q.answer);
    addAnswer({pollId: poll.id, participant: poll.writer, answers});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('설문에 참여해주셔서 감사합니다!', TOAST_OPTION.topCenter);
      if (+poll.point > 0) toast.info(`${+poll.point} 포인트를 획득하셨습니다!`, TOAST_OPTION.topCenter);
      navigate('/');
    }
  }, [isSuccess]);

  if (isParticipantPending) {
    return (
      <BeatLoader color={theme.COLOR.pink} height={10} width={300} aria-label="Loading Spinner" data-testid="loader" />
    );
  }

  return (
    <StPollPageContainer>
      <StPollContainer>
        <StPollHeader>
          <h1>{poll.title}</h1>
          <StProgressBar $percent={progressPercent}>
            ({count}/{poll.questions.length}개)
          </StProgressBar>
        </StPollHeader>
        <StQuestionContainer>
          {poll.questions.map((question, index) => (
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
