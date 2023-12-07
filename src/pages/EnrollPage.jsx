import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from '../styles/CommonStyles';
import WritePollContainer from '../components/Enroll/WritePoll/WritePollContainer';
import SubmitPollContainer from '../components/Enroll/SubmitPoll/SubmitPollContainer';
import theme from '../styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {init, TYPE} from '../redux/modules/enrollSlice';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl';
import {toast} from 'react-toastify';
import {useMutation} from '@tanstack/react-query';
import {addPoll} from '../api/polls';
import {useNavigate} from 'react-router-dom';

const SUBMIT = 'submit';
export const WRITE = 'write';

const TOAST_OPTION = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const EnrollPage = () => {
  const [nowForm, setNowForm] = useState(WRITE);
  const enrollData = useSelector(state => state.enroll);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  const {isSuccess, mutate: addMutation} = useMutation({
    mutationFn: newPoll => {
      return addPoll(newPoll);
    },
  });

  const onClickNextForm = () => {
    setNowForm(SUBMIT);
  };

  const onClickPreviousForm = () => {
    setNowForm(WRITE);
  };

  const onClickSubmitButton = e => {
    e.preventDefault();
    console.log(titleRef);
    if (titleRef.current.value === '') {
      toast.error('설문 제목을 입력해 주세요', TOAST_OPTION);
      titleRef.current.focus();
      return;
    }

    if (enrollData.questions.map(q => q.question).some(q => q === '')) {
      toast.error('입력되지 않은 질문이 있습니다.', TOAST_OPTION);
      setNowForm(WRITE);
      return;
    }

    if (
      enrollData.questions
        .filter(q => q.type === TYPE.SELECT)
        .map(q => q.answers)
        .flat()
        .map(a => a.answer)
        .some(a => a === '')
    ) {
      toast.error('입력되지 않은 사용자 답변이 있습니다.', TOAST_OPTION);
      return;
    }

    const newPollData = {
      ...enrollData,
      title: titleRef.current.value,
      createDate: new Date(),
    };
    addMutation(newPollData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('성공적으로 등록 되었습니다!', TOAST_OPTION);
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    // 등록 페이지로 들어오면 Form 전부 초기화
    dispatch(init());
  }, []);

  return (
    <StEnrollContainer>
      <StContentContainer $nowForm={nowForm}>
        <WritePollContainer />
        <SubmitPollContainer setNowForm={setNowForm} ref={titleRef} />
      </StContentContainer>

      <StButtonContainer>
        {nowForm === SUBMIT ? (
          <>
            <Button onClick={onClickPreviousForm} $bgColor={theme.COLOR.pink}>
              <SlArrowLeft />
              이전
            </Button>
            <Button onClick={onClickSubmitButton}>등록</Button>
          </>
        ) : (
          <div></div>
        )}
        {nowForm === WRITE ? (
          <Button onClick={onClickNextForm} $bgColor={theme.COLOR.pink}>
            다음
            <SlArrowRight />
          </Button>
        ) : (
          <div></div>
        )}
      </StButtonContainer>
    </StEnrollContainer>
  );
};

export default EnrollPage;

const StEnrollContainer = styled.div`
  ${() => ColumnCenter};
  padding: 10px 1rem 10px 1rem;
  width: 100%;
  height: calc(100vh - 100px);
`;

const StContentContainer = styled.section`
  ${() => RowCenter};
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  & > div {
    transform: translateX(${({$nowForm}) => ($nowForm === WRITE ? '0' : '-100%')});
  }
`;

const StButtonContainer = styled.div`
  ${() => RowCenter};
  width: 80%;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${() => theme.COLOR.lightPink};
  justify-content: center;

  & button:nth-child(2) {
    margin-left: 20px;
    width: 80px;
    justify-content: center;
  }
`;
