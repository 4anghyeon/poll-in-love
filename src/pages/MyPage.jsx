import React, {useState} from 'react';
import {auth} from 'shared/firebase/firebase';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail, updateUser} from 'api/users';
import {Link} from 'react-router-dom';
import {getPollByTargetIds, getPolls} from 'api/polls';
import styled from 'styled-components';
import {Button, ColumnCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import {AGE_OPTIONS, DEFAULT_IMAGE, GENDER_OPTIONS} from 'utils/defaultValue';
import {findParticipantByUserEmail} from 'api/participants';
import {getItmesByTargetIds} from 'api/items';
import Select from 'components/Common/Select';
import {downloadDataAsExcel} from '../utils/helper';
import {ClipLoader} from 'react-spinners';
import {toast} from 'react-toastify';
import TOAST_OPTION from '../utils/toast-option';

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedNickname, setModifiedNickname] = useState(null);
  const [modifiedGender, setModifiedGender] = useState(null);
  const [modifiedAge, setModifiedAge] = useState(null);
  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(auth.currentUser.email),
  });

  const {data: pollsData} = useQuery({queryKey: ['polls'], queryFn: getPolls});

  const {data: participatedPolls} = useQuery({
    queryKey: ['participatedPolls'],
    queryFn: () => findParticipantByUserEmail(auth.currentUser.email),
  });

  const targetPollIds = participatedPolls?.map(poll => poll.pollId) || [];

  const {data: submitPolls} = useQuery({
    queryKey: ['submitPolls', targetPollIds],
    queryFn: () => getPollByTargetIds(targetPollIds),
    enabled: targetPollIds.length > 0,
  });

  const writtenPolls = pollsData?.filter(poll => poll.writer === auth.currentUser.email);

  const {data: boughtItems} = useQuery({
    queryKey: ['bouthItems', user?.items],
    queryFn: () => getItmesByTargetIds(user?.items),
    // enabled: user?.items.length > 0,
  });
  const queryClient = useQueryClient();
  const {mutate: mutateToUpdateUser} = useMutation({
    mutationFn: () =>
      updateUser(user.id, modifiedNickname ?? user?.nickname, modifiedAge ?? user?.age, modifiedGender ?? user?.gender),
    onSuccess: async () => await queryClient.invalidateQueries(['user']),
  });

  const {isPending: isDownloadFending, mutate: downloadExcel} = useMutation({
    mutationFn: pollId => {
      return downloadDataAsExcel(pollId);
    },
    onSuccess: () => {
      toast.success('다운로드에 성공했습니다.', TOAST_OPTION.leftBottom);
    },
  });

  const onClickResultDownload = async pollId => {
    downloadExcel(pollId);
  };

  const onEditDone = () => {
    mutateToUpdateUser(modifiedNickname, modifiedAge, modifiedGender);
    setIsEditing(false);
  };

  return (
    <StContainer>
      <StProfile>
        <StTitle>내 프로필</StTitle>
        {isEditing ? (
          <>
            <StContent>
              <span>이메일</span>
              <p>{user?.email}</p>
              <span>닉네임</span>
              <input type="text" defaultValue={user?.nickname} onChange={e => setModifiedNickname(e.target.value)} />
              <span>보유 포인트</span>
              <p>{user?.point}p</p>
              <span>성별</span>
              <Select
                options={GENDER_OPTIONS.slice(1)}
                onChangeSelect={e => setModifiedGender(e.target.value)}
                value={user?.gender}
              />
              <span>연령대</span>
              <Select
                id="age"
                options={AGE_OPTIONS.slice(1)}
                onChangeSelect={e => setModifiedAge(e.target.value)}
                value={user?.age}
              />
            </StContent>
            <StBtns>
              <Button onClick={onEditDone} disabled={!modifiedNickname && !modifiedAge && !modifiedGender}>
                수정완료
              </Button>
              <Button onClick={() => setIsEditing(false)}>수정취소</Button>
            </StBtns>
          </>
        ) : (
          <>
            <StContent>
              <span>이메일</span>
              <p>{user?.email}</p>
              <span>닉네임</span>
              <p>{user?.nickname}</p>
              <span>보유 포인트</span>
              <p>{user?.point}p</p>
              <span>성별</span>
              <p>{user?.gender === 'male' ? '남성' : '여성'}</p>
              <span>연령대</span>
              <p>{user?.age}대</p>
            </StContent>
            <StBtns>
              <Button onClick={() => setIsEditing(true)}>회원정보 수정</Button>
            </StBtns>
          </>
        )}
      </StProfile>
      <StPollsContainer>
        <StTitle>작성한 설문</StTitle>
        <StWrapper>
          {writtenPolls?.length === 0 ? (
            <div>아직 등록한 설문이 없어요!</div>
          ) : (
            writtenPolls?.map(poll => (
              <StMyPollContainer key={poll.id}>
                <Link to={`/poll/${poll.id}`}>
                  <img src={poll.thumbnail ?? DEFAULT_IMAGE} alt="설문 썸네일" />
                  <div>{poll.title}</div>
                </Link>
                {isDownloadFending ? (
                  <ClipLoader color={theme.COLOR.purple} height={20} width={20} />
                ) : (
                  <Button onClick={onClickResultDownload.bind(null, poll.id)}>설문 결과 다운받기</Button>
                )}
              </StMyPollContainer>
            ))
          )}
        </StWrapper>
      </StPollsContainer>
      <StPollsContainer>
        <StTitle>참여한 설문</StTitle>
        <StWrapper>
          {submitPolls === undefined ? (
            <div>아직 참여한 설문이 없어요!</div>
          ) : (
            submitPolls?.map((poll, index) => (
              <StMyPollContainer key={index}>
                <Link to={`/poll/${poll.id}`}>
                  <img src={poll.thumbnail ?? DEFAULT_IMAGE} />
                  <div> {poll.nickname}</div>
                  <div>{poll.title}</div>
                  <div>{poll.point}p</div>
                </Link>
              </StMyPollContainer>
            ))
          )}
        </StWrapper>
      </StPollsContainer>
      <StPollsContainer>
        <StTitle>구입한 아이템</StTitle>
        <StWrapper>
          {boughtItems === undefined ? (
            <div>아직 구매한 아이템이 없어요!</div>
          ) : (
            boughtItems?.map((item, index) => (
              <StMyPollContainer key={index}>
                <img src={item.imageUrl} />
                <div> {item.name}</div>
                <div>{item.point}p</div>
              </StMyPollContainer>
            ))
          )}
        </StWrapper>
      </StPollsContainer>
    </StContainer>
  );
};

export default MyPage;

const StProfile = styled.div`
  background-color: whitesmoke;
  width: inherit;
  line-height: 30px;
  border-radius: 20px;
  font-size: ${theme.FONT_SIZE.lg};
  margin: 20px 0px;
  padding-bottom: 20px;
  box-shadow: 0px 8px 16px 0px #00000033;
  input,
  select {
    width: 100%;
    height: 45px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
`;

const StPollsContainer = styled.div`
  background-color: whitesmoke;
  width: inherit;
  line-height: 30px;
  border-radius: 20px;
  font-size: ${theme.FONT_SIZE.lg};
  margin: 20px 0px;
  padding-bottom: 20px;
  box-shadow: 0px 8px 16px 0px #00000033;
  & img {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    box-shadow: 0px 8px 16px 0px #00000033;
  }
`;

const StContainer = styled.div`
  ${ColumnCenter}
  gap: 15px;
  width: 80%;
  & h1 {
    font-size: 25px;
  }
`;

const StWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  place-items: center;
  margin: 20px;
`;

const StMyPollContainer = styled.div`
  ${ColumnCenter}
  gap: 15px;
  text-align: center;
  & div {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StTitle = styled.div`
  background-color: ${theme.COLOR.pink};
  width: 100%;
  height: 50px;
  border-radius: 20px 20px 0 0;
  text-align: left;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  font-size: ${theme.FONT_SIZE.xl};
  font-weight: 800;
  color: white;
`;

const StContent = styled.div`
  width: 100%;
  border-radius: 0 0 20px 20px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  padding: 20px;
  gap: 30px;
`;

const StBtns = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;
