import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logoImge.png';
import {RxAvatar} from 'react-icons/rx';
import {NavLink} from '../../../node_modules/react-router-dom/dist/index';
import theme from 'styles/theme';
import {auth, db} from 'shared/firebase/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {collection, getDocs, query, where, getDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import {Button} from 'styles/CommonStyles';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserByEmail} from 'api/users';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  // const [userEmail, setUserEmail] = useState('');
  const [userDocId, setUserDocId] = useState('');
  let userEmail;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('user', user); // user 정보 없으면 null 표시
      setCurrentUser(user);
      userEmail = user.email;
      console.log(userEmail);
    });
  }, []);

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserByEmail(userEmail),
  });

  console.log('user!!', user);
  // console.log(user.id);
  /*
  const getUserByEmail = async () => {
    const q = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      userData = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()};
      console.log(userData);
      // setUserDocId(querySnapshot.docs[0].id)
    }
    // querySnapshot.forEach(doc => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   setUserDocId(doc.id);
    // });
  };
  getUserByEmail();
*/
  const logOutUser = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <StHeader>
      <NavLink to="/">
        <img src={logo} width={300} height={40} alt="logo" />
      </NavLink>
      {currentUser ? (
        <>
          <NavLink to={`/mypage/${user?.id}`}>
            <RxAvatar size="45" color="white" />
          </NavLink>
          <Button onClick={logOutUser}>로그아웃</Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate('/login')}>로그인</Button>
          <Button onClick={() => navigate('/signup')}>회원가입</Button>
        </>
      )}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  background-color: ${theme.COLOR.purple};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
