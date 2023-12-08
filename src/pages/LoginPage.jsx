import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import {auth, provider} from 'shared/firebase/firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import logo from '../assets/images/logoImge.png';
import 'react-toastify/dist/ReactToastify.css';
import theme from 'styles/theme';
import {FaGoogle} from 'react-icons/fa';
import {NavLink, useNavigate} from 'react-router-dom';
import {addUser, getUserByEmail} from 'api/users';
import {toast} from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onChangeEmail = e => {
    setEmail(() => {
      const newEmail = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!newEmail) setEmailError('이메일 아이디를 입력해주세요.');
      else if (!emailRegex.test(newEmail)) setEmailError('올바른 이메일 형식이 아닙니다.');
      else setEmailError('');
      return newEmail;
    });
  };

  const onChangePassword = e => {
    setPassword(() => {
      const newPassword = e.target.value;
      if (!newPassword) setPasswordError('비밀번호를 입력해주세요.');
      else if (newPassword.length < 6) setPasswordError('비밀번호는 6자 이상이어야 합니다.');
      else setPasswordError('');
      return newPassword;
    });
  };

  const onClickLoginButton = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      navigate('/');
    } catch (error) {
      console.log(error);
      console.log(error.code);
      if (error.code === 'auth/invalid-credential') toast.error('비밀번호 또는 이메일이 일치하지 않습니다.');
    }
  };

  const onClickGoogleLoginButton = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const existUser = await getUserByEmail(user.email);

      if (!existUser) {
        // 기존 유저가 없는 경우만 등록
        const newUser = {
          nickname: user.displayName,
          email: user.email,
          point: 0,
          age: null,
          gender: null,
          items: [],
        };
        await addUser(newUser);
      }
      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error.message);
    }
  };

  return (
    <StContainer>
      <StForm onSubmit={onClickLoginButton}>
        <NavLink to="/">
          <img src={logo} width={300} height={40} alt="logo" />
        </NavLink>
        <input
          placeholder="이메일 아이디를 입력하세요."
          type="email"
          name="email"
          onChange={onChangeEmail}
          value={email}
          required
        />
        <div style={{color: 'red'}}>{emailError}</div>
        <input
          placeholder="비밀번호를 입력하세요."
          type="password"
          name="password"
          onChange={onChangePassword}
          value={password}
          required
        />
        <div style={{color: 'red'}}>{passwordError}</div>
        <StButtons>
          <StButton type="submit">로그인</StButton>
          <StButton type="button" onClick={onClickGoogleLoginButton} $bgColor={theme.COLOR.pink}>
            <span>
              <FaGoogle />
              &nbsp;구글 계정으로 로그인
            </span>
          </StButton>
          <StButton type="button" onClick={() => navigate('/signup')}>
            회원가입
          </StButton>
        </StButtons>
      </StForm>
    </StContainer>
  );
};

const StContainer = styled.div`
  ${ColumnCenter}
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
`;

const StForm = styled.form`
  width: 30%;
  ${ColumnCenter}
  gap: 15px;
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
  ${ColumnCenter}
  width: 100%;
  gap: 10px;
  margin-top: 15px;
`;

const StButton = styled(Button)`
  width: 100%;
  ${RowCenter}
`;

export default LoginPage;
