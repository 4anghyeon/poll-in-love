import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from '../styles/CommonStyles';
import theme from '../styles/theme';
import QuestionBox from '../components/Poll/QuestionBox';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addParticipant, findParticipantByPollIdAndUserId} from '../api/participants';
import {toast} from 'react-toastify';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';
import {getUserByEmail, updateUserPoint} from '../api/users';
import {auth} from '../shared/firebase/firebase';
import TOAST_OPTION from '../utils/toast-option';
import Modal from 'react-modal';
import {DEFAULT_IMAGE} from '../utils/defaultValue';

const PollPage = () => {
  const poll = useLoaderData();
  const [answer, setAnswer] = useState({...poll});
  const navigate = useNavigate();

  const count = answer.questions.map(q => q.check === true).filter(q => q).length;
  const progressPercent = (count / (poll.questions.length || 1)) * 100;

  const {isPending: isParticipantPending, data: participants} = useQuery({
    queryKey: ['poll', poll.id],
    queryFn: findParticipantByPollIdAndUserId.bind(null, poll.id, auth.currentUser.email),
  });
  const isSurveyed = participants?.length > 0;

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
    onSuccess: async () => {
      const {id} = await getUserByEmail(auth.currentUser.email);
      updatePoint({userId: id, point: +poll.point});
    },
  });

  const onClickSubmitButton = () => {
    const answers = answer.questions.map(q => q.answer);
    addAnswer({pollId: poll.id, participant: auth.currentUser.email, answers});
  };

  const onClickHome = () => {
    navigate('/');
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
      {isSurveyed && (
        <Modal style={modalStyle} isOpen={true} ariaHideApp={false}>
          <StModalContent>
            <h1>이미 참여하신 설문입니다. 🥺</h1>
            <p>다른 설문에 참여 해보세요.</p>
            <Button onClick={onClickHome}>홈으로</Button>
          </StModalContent>
        </Modal>
      )}
      <StPollContainer $isSurveyed={isSurveyed}>
        <StPollHeader>
          <h1>
            {poll.title}
            <StPickPoint>{poll.point} 포인트</StPickPoint>
          </h1>
        </StPollHeader>
        <StThumbnailFigure>
          <img src={poll.thumbnail || DEFAULT_IMAGE} alt="설문 썸네일" />
        </StThumbnailFigure>
        <StProgressBar $percent={progressPercent}>
          ({count}/{poll.questions.length}개)
        </StProgressBar>
        <StQuestionContainer>
          {poll.questions.map((question, index) => (
            <QuestionBox key={question.id} index={index} question={question} setAnswer={setAnswer} />
          ))}
        </StQuestionContainer>
        {isSurveyed > 0 ? (
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

const modalStyle = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '50%',
    height: '50%',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    overflow: 'auto',
  },
};

const StPollPageContainer = styled.article`
  ${ColumnCenter};
  width: 100%;
  height: 100%;
`;

const StPollContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 25% 0 25%;
  margin-bottom: 20px;
  filter: blur(${({$isSurveyed}) => ($isSurveyed ? '2px' : 0)});

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
      padding: 0 5% 0 5%;
    }
  }
`;

const StPollHeader = styled.div`
  ${RowCenter};
  width: 100%;
  text-align: center;
  padding-top: 20px;

  & h1 {
    ${RowCenter};
    font-size: ${theme.FONT_SIZE.xl};
  }
`;

const StProgressBar = styled.div`
  margin-top: 20px;
  padding: 5px;
  font-weight: bold;
  text-align: center;
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

const StThumbnailFigure = styled.figure`
  ${RowCenter};
  width: 100%;
  margin-top: 20px;
  & img {
    max-height: 250px;
  }
`;

const StModalContent = styled.div`
  ${ColumnCenter};
  height: 100%;
  justify-content: space-evenly;

  & h1 {
    font-size: ${theme.FONT_SIZE.xl};
  }
  & p {
    font-size: ${theme.FONT_SIZE.lg};
  }
`;

const StPickPoint = styled.div`
  font-weight: bold;
  padding: 4px;
  border: 2px solid ${theme.COLOR.pink};
  border-radius: 10px;
  color: ${theme.COLOR.pink};
  text-align: center;
  line-height: 1.5;
  font-size: ${theme.FONT_SIZE.base};
  margin-left: 10px;
`;
