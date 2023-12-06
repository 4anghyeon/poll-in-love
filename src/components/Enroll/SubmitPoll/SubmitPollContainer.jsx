import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';
import ThumbnailBox from './ThumbnailBox';
import AdditionalInfoBox from './AdditionalInfoBox';
import {useSelector} from 'react-redux';
import {TYPE} from '../../../redux/modules/enrollSlice';
import {useMutation} from '@tanstack/react-query';
import {addPoll} from '../../../api/enroll';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {WRITE} from '../../../pages/EnrollPage';

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

// 만든 설문조사 제출
// 제목, 포인트, 썸네일 입력
const SubmitPollContainer = ({setNowForm}) => {
  const enrollData = useSelector(state => state.enroll);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    mutate: addMutation,
  } = useMutation({
    mutationFn: newPoll => {
      return addPoll(newPoll);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('성공적으로 등록 되었습니다!', TOAST_OPTION);
      navigate('/');
    }
  }, [isSuccess]);

  const onClickSubmitButton = e => {
    e.preventDefault();
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

  return (
    <StContainer>
      <input placeholder={'설문 제목을 입력해 주세요'} ref={titleRef} />
      <StDescriptionContainer>
        <ThumbnailBox />
        <AdditionalInfoBox />
      </StDescriptionContainer>
      {!isPending && <StSubmitButton onClick={onClickSubmitButton}>등록</StSubmitButton>}
    </StContainer>
  );
};

export default SubmitPollContainer;

const StContainer = styled.div`
  ${() => ColumnCenter};
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 100%;

  & input {
    width: 100%;
    padding: 20px;
    height: 60px;
    margin-bottom: 20px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid ${() => theme.COLOR.lightPink};
  }
`;

const StDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  width: 100%;
  justify-content: space-around;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    & {
      grid-template-columns: 1fr; /* 1개의 열로 구성 */
    }
  }
`;

const StSubmitButton = styled(Button)`
  //margin-top: 120px;
`;
