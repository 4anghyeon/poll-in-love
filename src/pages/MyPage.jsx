import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {auth, db} from 'shared/firebase/firebase';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail} from 'api/users';
import {getPollByTargetIds, getPolls} from 'api/polls';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import {Link} from 'react-router-dom';
import theme from 'styles/theme';
import {DEFAULT_IMAGE} from 'utils/defaultValue';
import {findParticipantByUserEmail} from 'api/participants';
import {collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where} from 'firebase/firestore';
import {getItmesByTargetIds} from 'api/items';

const MyPage = () => {
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

  console.log(user?.items);
  const {data: boughtItems} = useQuery({
    queryKey: ['bouthItems', user?.items],
    queryFn: () => getItmesByTargetIds(user?.items),
    enabled: user?.items.length > 0,
  });

  console.log('boughtItems', boughtItems);
  const onClickResultDownload = e => {
    e.stopPropagation();
    alert('hi');
  };

  return (
    <StContainer>
      <h1>My Page</h1>
      <StProfile>
        <h1>프로필</h1>
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
          <p>{user?.gender}</p>
        </div>
        <div>
          <span>연령대</span>
          <p>{user?.age}대</p>
        </div>
        <div>
          <span>보유 아이템</span>
          <p>{user?.items}</p>
        </div>
      </StProfile>
      <StWrittenPolls>
        <h1> 작성한 설문</h1>
        <StWrapper>
          {writtenPolls?.length === 0 ? (
            <div>아직 등록한 설문이 없어요!</div>
          ) : (
            writtenPolls?.map((poll, index) => (
              <Link to={`/poll/${poll.id}`} key={index}>
                <img src={poll.thumbnail ?? DEFAULT_IMAGE} />
                <div> {poll.writer}</div>
                <div>{poll.title}</div>
                <div>{poll.point}p</div>
                <Button onClick={onClickResultDownload}>설문 결과 다운받기</Button>
              </Link>
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
          {boughtItems?.length === 0 ? (
            <div>아직 구매한 아이템이 없어요!</div>
          ) : (
            boughtItems?.map((item, index) => (
              <div key={index}>
                <img src={item.imageUrl} />
                <div> {item.name}</div>
                <div>{item.point}</div>
                <div>{item.sale}p</div>
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
