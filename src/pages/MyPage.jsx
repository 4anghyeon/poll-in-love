import React, {useState} from 'react';
import {auth} from 'shared/firebase/firebase';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail, updateUser} from 'api/users';
import {getPollByTargetIds, getPolls} from 'api/polls';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import {Link} from 'react-router-dom';
import theme from 'styles/theme';
import {AGE_OPTIONS, DEFAULT_IMAGE, GENDER_OPTIONS} from 'utils/defaultValue';
import {findParticipantByUserEmail} from 'api/participants';
import {getItmesByTargetIds} from 'api/items';
import Select from 'components/Common/Select';

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

  const onClickResultDownload = e => {
    e.stopPropagation();
    alert('hi');
  };

  const onEditDone = () => {
    // const nickname = modifiedNickname ?? user?.nickname;
    // const age = modifiedAge ?? user?.age;
    // const gender = modifiedGender ?? user?.gender;
    mutateToUpdateUser(modifiedNickname, modifiedAge, modifiedGender);
    setIsEditing(false);
  };
  console.log(modifiedNickname, modifiedGender, modifiedAge);
  console.log('bougtItems', boughtItems);
  return (
    <StContainer>
      <h1>My Page</h1>
      <StProfile>
        <h1>프로필</h1>{' '}
        {isEditing ? (
          <>
            <div>
              <span>이메일</span>
              <p>{user?.email}</p>
            </div>
            <div>
              <span>닉네임</span>

              <input type="text" defaultValue={user?.nickname} onChange={e => setModifiedNickname(e.target.value)} />
            </div>
            <div>
              <span>보유 포인트</span>
              <p>{user?.point}p</p>
            </div>
            <div>
              <span>성별</span>
              <Select
                options={GENDER_OPTIONS}
                onChangeSelect={e => setModifiedGender(e.target.value)}
                value={user?.gender}
              />
            </div>
            <div>
              <span>연령대</span>
              <Select
                id="age"
                options={AGE_OPTIONS}
                onChangeSelect={e => setModifiedAge(e.target.value)}
                value={user?.age}
              />
            </div>
            <Button onClick={onEditDone} disabled={!modifiedNickname && !modifiedAge && !modifiedGender}>
              수정완료
            </Button>
            <Button onClick={() => setIsEditing(false)}>수정취소</Button>
          </>
        ) : (
          <>
            <div>
              <span>이메일</span>
              <p>{user?.email}</p>
            </div>
            <div>
              <span>닉네임</span>
              <p>{user?.nickname}</p>
            </div>
            <div>
              <span>보유 포인트</span>
              <p>{user?.point}p</p>
            </div>
            <div>
              <span>성별</span>
              <p>{user?.gender === 'male' ? '남성' : '여성'}</p>
            </div>
            <div>
              <span>연령대</span>
              <p>{user?.age}대</p>
            </div>
            <Button onClick={() => setIsEditing(true)}>회원정보 수정</Button>
          </>
        )}
      </StProfile>
      <StWrittenPolls>
        <h1> 작성한 설문</h1>
        <StWrapper>
          {writtenPolls?.length === 0 ? (
            <div>아직 등록한 설문이 없어요!</div>
          ) : (
            writtenPolls?.map((poll, index) => (
              <div key={index}>
                <Link to={`/poll/${poll.id}`}>
                  <img src={poll.thumbnail ?? DEFAULT_IMAGE} />
                  <div> {poll.writer}</div>
                  <div>{poll.title}</div>
                  <div>{poll.point}p</div>
                </Link>
                <Button onClick={onClickResultDownload}>설문 결과 다운받기</Button>
              </div>
            ))
          )}
        </StWrapper>
      </StWrittenPolls>
      <StSubmittedPolls>
        <h1>참여한 설문</h1>
        <StWrapper>
          {submitPolls?.length === 0 ? (
            <div>아직 참여한 설문이 없어요!</div>
          ) : (
            submitPolls?.map((poll, index) => (
              <Link to={`/poll/${poll.id}`} key={index}>
                <img src={poll.thumbnail ?? DEFAULT_IMAGE} />
                <div> {poll.writer}</div>
                <div>{poll.title}</div>
                <div>{poll.point}p</div>
              </Link>
            ))
          )}
        </StWrapper>
      </StSubmittedPolls>
      <StSubmittedPolls>
        <h1>구입한 아이템</h1>
        <StWrapper>
          {boughtItems === undefined ? (
            <div>아직 구매한 아이템이 없어요!</div>
          ) : (
            boughtItems?.map((item, index) => (
              <div key={index}>
                <img src={item.imageUrl} />
                <div> {item.name}</div>
                <div>{item.point}p</div>
              </div>
            ))
          )}
        </StWrapper>
      </StSubmittedPolls>
    </StContainer>
  );
};

export default MyPage;

const StProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${theme.COLOR.lightPink};
  width: inherit;
  padding: 20px;
  line-height: 30px;
  border-radius: 15px;
  font-size: ${theme.FONT_SIZE.lg};
  & div {
    ${RowCenter}
    gap: 20px;
  }
`;

const StWrittenPolls = styled.div`
  background-color: ${theme.COLOR.pink};
  border-radius: 15px;
  margin: 20px 0px;
  padding: 20px;
  width: inherit;
  & img {
    width: 200px;
    height: 200px;
  }
`;

const StSubmittedPolls = styled.div`
  background-color: ${theme.COLOR.pink};
  border-radius: 15px;
  margin: 20px 0px;
  padding: 20px;
  width: inherit;
  & img {
    width: 200px;
    height: 200px;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  place-items: center;
  margin: 20px;
`;
