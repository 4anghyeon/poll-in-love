import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import {auth} from 'shared/firebase/firebase';
import {onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from 'styles/theme';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeValue = event => {
    const {
      target: {name, value},
    } = event;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const onClickLoginButton = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') toast.error('이메일 또는 비밀번호가 일치하지 않습니다');
      else if (error.code === 'auth/invalid-email') toast.error('이메일 주소가 유효하지 않습니다');
    }
  };
  const onClickGoogleLoginButton = () => {};

  return (
    <StContainer>
      <ToastContainer />
      <StForm>
        <h1>로그인</h1>
        <input
          placeholder="이메일을 입력하세요."
          type="email"
          name="email"
          onChange={onChangeValue}
          value={email}
          required
        />
        <input
          placeholder="비밀번호를 입력하세요."
          type="password"
          name="password"
          onChange={onChangeValue}
          value={password}
          required
        />
      </StForm>
      <StButtons>
        <StButton onClick={onClickLoginButton} disabled={!email || !password}>
          로그인
        </StButton>
        <StButton onClick={onClickGoogleLoginButton}>
          <img src="#" alt="googleIcon" />
          <span>구글 계정으로 로그인</span>
        </StButton>
        <StButton>회원가입</StButton>
      </StButtons>
    </StContainer>
  );
};

const StContainer = styled.div`
  ${ColumnCenter}
  gap: 15px;
  width: 40%;
  border: 1px solid lightgrey;
`;

const StForm = styled.div`
  ${ColumnCenter}
  h1 {
    font-size: ${theme.FONT_SIZE.xl};
  }
  input {
    width: 100%;
    padding: 20px;
    height: 60px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
`;

const StButtons = styled.div`
  display: flex;
  flex-direction: column;
  background-color: yellow;
`;
export default LoginPage;

const StButton = styled(Button)`
  width: 100%;
`;
