import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'shared/firebase/firebase';
import logo from '../assets/images/logoImge.png';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import {toast} from 'react-toastify';
import {addUser} from 'api/users';
import Select from '../components/Common/Select';
import {AGE_OPTIONS, GENDER_OPTIONS} from '../utils/defaultValue';
import {useMutation} from '@tanstack/react-query';
import {BarLoader} from 'react-spinners';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const navigate = useNavigate();

  const {
    isPending: isAddPending,
    isSuccess: isAddSuccess,
    mutate: addMutation,
  } = useMutation({
    mutationFn: newUser => {
      addUser(newUser);
    },
  });

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

  const onChangeConfirmPassword = e => {
    setConfirmPassword(() => {
      const newConfirmPassword = e.target.value;
      if (!newConfirmPassword) setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
      else if (password !== newConfirmPassword) setConfirmPasswordError('비밀번호를 잘못 입력하셨습니다.');
      else setConfirmPasswordError('');
      return newConfirmPassword;
    });
  };

  const onChangeNickname = e => {
    setNickname(() => {
      const newNickname = e.target.value;
      if (!newNickname) setNicknameError('닉네임을 입력해주세요.');
      else if (newNickname.length < 2) setNicknameError('닉네임은 2자 이상이어야 합니다.');
      else setNicknameError('');
      return newNickname;
    });
  };
  const onSubmitSignUp = async e => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        nickname,
        email,
        point: 0,
        age,
        gender,
        items: [],
      };
      addMutation(newUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('error with signUp', errorCode, errorMessage);
      if (errorCode === 'auth/email-already-in-use') toast.error('이미 존재하는 아이디입니다.');
      else if (errorCode === 'auth/invalid-email') toast.error('유효하지 않은 이메일 입니다.');
    }
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success('회원가입 성공!');
      navigate('/');
    }
  }, [isAddSuccess]);

  if (isAddPending) {
    return <BarLoader color={theme.COLOR.pink} height={10} width={300} />;
  }

  return (
    <StContainer>
      <StForm onSubmit={onSubmitSignUp}>
        <NavLink to="/">
          <img src={logo} width={300} height={40} alt="logo" />
        </NavLink>
        <label htmlFor="email">이메일 아이디</label>
        <input
          placeholder="이메일 아이디를 입력하세요."
          id="email"
          type="email"
          onChange={onChangeEmail}
          value={email}
          required
        />
        <div style={{color: 'red'}}>{emailError}</div>
        <label htmlFor="password">비밀번호</label>
        <input
          placeholder="비밀번호를 입력하세요."
          id="password"
          type="password"
          onChange={onChangePassword}
          value={password}
          required
        />
        <span style={{color: 'red'}}>{passwordError}</span>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          placeholder="비밀번호를 다시 입력하세요."
          id="confirmPassword"
          type="password"
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
          required
        />
        <span style={{color: 'red'}}>{confirmPasswordError}</span>
        <label htmlFor="nickname">닉네임</label>
        <input
          placeholder="닉네임을 입력하세요."
          id="nickname"
          type="text"
          onChange={onChangeNickname}
          value={nickname}
          required
        />
        <span style={{color: 'red'}}>{nicknameError}</span>
        <label htmlFor="age">연령대</label>
        <Select id="age" options={AGE_OPTIONS} onChangeSelect={e => setAge(e.target.value)} />
        <label htmlFor="gender">성별</label>
        <Select id="gender" options={GENDER_OPTIONS} onChangeSelect={e => setGender(e.target.value)} />
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
  ${ColumnCenter};
  width: 100%;
  padding: 20px 0 20px 0;
  //padding: 20px 0 20px 0;
  justify-content: flex-start;
  background-color: whitesmoke;
`;

const StForm = styled.form`
  width: 30%;
  ${ColumnCenter};
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
  div {
    width: 100%;
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
