import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import {auth, db, provider} from 'shared/firebase/firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import logo from '../assets/images/logoImge.png';
import 'react-toastify/dist/ReactToastify.css';
import theme from 'styles/theme';
import {FaGoogle} from 'react-icons/fa';
import {NavLink, useNavigate} from '../../node_modules/react-router-dom/dist/index';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onChangeValue = event => {
    const {
      target: {name, value},
    } = event;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('이메일 아이디를 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const onClickLoginButton = async e => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoogleLoginButton = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Login Successful:', user);
      const newUserObj = {
        email: user.email,
      };
      const docRef = await addDoc(collection(db, 'users'), newUserObj);
      navigate('/');
      console.log('Document written with ID: ', docRef.id);
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
          onChange={onChangeValue}
          value={email}
          required
          onBlur={validateEmail}
        />
        <span style={{color: 'red'}}>{emailError}</span>
        <input
          placeholder="비밀번호를 입력하세요."
          type="password"
          name="password"
          onChange={onChangeValue}
          value={password}
          required
          onBlur={validatePassword}
        />
        <span style={{color: 'red'}}>{passwordError}</span>
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
