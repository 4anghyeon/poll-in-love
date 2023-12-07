import React from 'react';
import {useParams} from 'react-router-dom';
import {auth, db} from 'shared/firebase/firebase';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail} from 'api/users';
import {getPolls} from 'api/polls';

const MyPage = () => {
  //   const {id} = useParams();
  //   console.log(id);
  const {isLoading: isLoadingPolls, data: pollsData} = useQuery({queryKey: ['polls'], queryFn: getPolls});

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(auth.currentUser.email),
  });
  console.log(user);
  return (
    <>
      <div>{user?.email}</div>
      <div>{user?.nickname}</div>
      <div>{user?.point}</div>
      <div>{user?.gender}</div>
      <div>{user?.items}</div>
    </>
  );
};

export default MyPage;
