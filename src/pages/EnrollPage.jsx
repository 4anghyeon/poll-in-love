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
import {useMutation, useQuery} from '@tanstack/react-query';
import {addPoll, updatePollThumbnail, uploadThumbnail} from '../api/polls';
import {useNavigate} from 'react-router-dom';
import TOAST_OPTION from '../utils/toast-option';
import {BeatLoader} from 'react-spinners';
import {isPending} from '@reduxjs/toolkit';
import {auth} from '../shared/firebase/firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getUserByEmail} from '../api/users';

const SUBMIT = 'submit';
export const WRITE = 'write';

const EnrollPage = () => {
  const [nowForm, setNowForm] = useState(WRITE);
  const [imgFile, setImgFile] = useState(null);
  const enrollData = useSelector(state => state.enroll);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  // 설문 조사 등록 mutation
  const {
    isPending: isAddPending,
    isSuccess: isAddSuccess,
    mutate: addMutation,
  } = useMutation({
    mutationFn: newPoll => {
      return addPoll(newPoll);
    },
    onSuccess: async pollId => {
      if (imgFile) {
        const imgUrl = await uploadMutation({pollId, uploadFile: imgFile});
        await updateMutation({pollId, imgUrl});
      }
    },
  });

  // 썸네일 업로드 mutation
  const {isSuccess: isUploadSuccess, mutateAsync: uploadMutation} = useMutation({
    mutationFn: ({pollId, uploadFile}) => {
      return uploadThumbnail(pollId, uploadFile);
    },
    onSuccess: data => {
      return data;
    },
    onError: err => {
      console.error(err);
    },
  });

  // 썸네일 업로드 후 -> 이미지 파일 등록한 poll에 update하는 mutation
  const {mutateAsync: updateMutation} = useMutation({
    mutationFn: ({pollId, imgUrl}) => {
      return updatePollThumbnail(pollId, imgUrl);
    },
  });

  // 등록 유저 정보
  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(auth.currentUser.email),
  });

  // 다음 페이지 이동
  const onClickNextForm = () => {
    setNowForm(SUBMIT);
  };

  // 이전 페이지 이동
  const onClickPreviousForm = () => {
    setNowForm(WRITE);
  };

  // 설문 등록 버튼시
  const onClickSubmitButton = e => {
    e.preventDefault();
    if (titleRef.current.value === '') {
      toast.error('설문 제목을 입력해 주세요', TOAST_OPTION.topCenter);
      titleRef.current.focus();
      return;
    }

    if (enrollData.questions.map(q => q.question).some(q => q === '')) {
      toast.error('입력되지 않은 질문이 있습니다.', TOAST_OPTION.topCenter);
      setNowForm(WRITE);
      return;
    }

    const checkEmptyAnswerExist = enrollData.questions
      .filter(q => q.type === TYPE.SELECT)
      .map(q => q.answers)
      .flat()
      .map(a => a.answer)
      .some(a => a === '');

    if (checkEmptyAnswerExist) {
      toast.error('입력되지 않은 사용자 답변이 있습니다.', TOAST_OPTION.topCenter);
      setNowForm(WRITE);
      return;
    }

    const newPollData = {
      ...enrollData,
      writer: auth.currentUser.email,
      nickname: user.nickname,
      title: titleRef.current.value,
      createDate: new Date(),
    };
    addMutation(newPollData);
  };

  useEffect(() => {
    if ((isAddSuccess && !imgFile) || (isAddSuccess && imgFile && isUploadSuccess)) {
      toast.success('성공적으로 등록 되었습니다!', TOAST_OPTION.topCenter);
      navigate('/');
    } else if (isAddSuccess && imgFile && !isUploadSuccess) {
      toast.error('썸네일 업로드에 문제가 발생했습니다.', TOAST_OPTION.topCenter);
      navigate('/');
    }
  }, [isAddSuccess, isUploadSuccess]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        toast.error('로그인 후 이용해 주세요', TOAST_OPTION.topCenter);
        navigate('/login', {replace: true});
      }
    });
    // 등록 페이지로 들어오면 Form 전부 초기화
    dispatch(init());
  }, []);

  return (
    <StEnrollContainer>
      {isAddPending && (
        <StOverlay>
          <BeatLoader
            color={theme.COLOR.pink}
            height={10}
            width={300}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </StOverlay>
      )}

      <StContentContainer $nowForm={nowForm} $isAddPending={isAddPending}>
        <WritePollContainer />
        <SubmitPollContainer setNowForm={setNowForm} setImgFile={setImgFile} ref={titleRef} />
      </StContentContainer>
      <StButtonContainer $isAddPending={isAddPending}>
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
  filter: blur(${({$isAddPending}) => ($isAddPending ? '2px' : 0)});

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
  filter: blur(${({$isAddPending}) => ($isAddPending ? '2px' : 0)});

  & button:nth-child(2) {
    margin-left: 20px;
    width: 80px;
    justify-content: center;
  }
`;

const StOverlay = styled.div`
  ${RowCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
