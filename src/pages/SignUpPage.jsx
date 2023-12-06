import React, {useState} from 'react';
import {NavLink} from '../../node_modules/react-router-dom/dist/index';
import logo from '../assets/images/logoImge.png';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import useForm from 'hooks/useForm';

const SignUpPage = () => {
  const {formState, onChangeHandler, resetForm} = useForm({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    age: '',
    gender: '',
  });
  const {email, password, confirmPassword, nickname, age, gender} = formState;
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState();
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  console.log(email, password, confirmPassword, nickname, age, gender);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) setEmailError('이메일 아이디를 입력해주세요.');
    else if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');
  };

  const validatePassword = () => {
    if (!password) setPasswordError('비밀번호를 입력해주세요.');
    else if (password.length < 6) setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    else setPasswordError('');
  };

  const onClickSignUpButton = () => {};
  return (
    <StContainer>
      <StForm onSubmit={onClickSignUpButton}>
        <NavLink to="/">
          <img src={logo} width={300} height={40} alt="logo" />
        </NavLink>
        <label>이메일 아이디</label>
        <input
          placeholder="이메일 아이디를 입력하세요."
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={email}
          required
          onBlur={validateEmail}
        />
        <span style={{color: 'red'}}>{emailError}</span>
        <label>비밀번호</label>
        <input
          placeholder="비밀번호를 입력하세요."
          type="password"
          name="password"
          onChange={onChangeHandler}
          value={password}
          required
          onBlur={validatePassword}
        />
        <span style={{color: 'red'}}>{passwordError}</span>
        <label>비밀번호 확인</label>
        <input
          placeholder="비밀번호를 다시 입력하세요."
          type="password"
          name="confirmPassword"
          onChange={onChangeHandler}
          value={confirmPassword}
          required
          // onBlur={validatePassword}
        />
        <span style={{color: 'red'}}>{passwordError}</span>
        <label>닉네임</label>
        <input
          placeholder="이메일 아이디를 입력하세요."
          type="text"
          name="nickname"
          onChange={onChangeHandler}
          value={nickname}
          required
          // onBlur={validateEmail}
        />
        <label htmlFor="age">연령대</label>
        <select id="age" name="age" onChange={onChangeHandler}>
          <option value="0">상관 없음</option>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
          <option value="60">60대</option>
          <option value="70">70대</option>
        </select>
        <label htmlFor="gender">성별</label>
        <select id="gender" name="gender" onChange={onChangeHandler}>
          <option value="none">상관 없음</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <StButtons>
          <StButton type="submit" disabled={!email || !password || !confirmPassword || !nickname || !age || !gender}>
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
  label {
    width: 95%;
  }
  h1 {
    font-size: ${theme.FONT_SIZE.xl};
  }
  input,
  select {
    width: 100%;
    padding: 20px;
    height: 60px;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 1px solid lightgrey;
  }
  select {
    outline: none;
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

export default SignUpPage;
