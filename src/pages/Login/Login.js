import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const loginHandler = () => {
    fetch('http://172.2.0.189:8000/user/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: inputValues.email,
        password: inputValues.password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('access_token', res.token);
        navigate('/');
      });
  };

  const changeValue = e => {
    const { name, value } = e.target;
    setInputValues(prestate => {
      return { ...prestate, [name]: value };
    });
  };

  const validCheck =
    inputValues.email.includes('@') && inputValues.password.length > 7;

  const goToMain = () => {
    navigate('/');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <RegisterFormWrap>
      <Logo onClick={goToMain}>Influence</Logo>
      <RegisterForm>
        <InputWrap>
          <P>이메일</P>
          <Input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={changeValue}
          />
        </InputWrap>
        <InputWrap>
          <P>비밀번호</P>
          <Input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={changeValue}
          />
        </InputWrap>
        <InputWrap>
          <Button type="button" onClick={loginHandler}>
            로그인
          </Button>
          <Button type="button" onClick={goToRegister}>
            회원가입
          </Button>
        </InputWrap>
      </RegisterForm>
    </RegisterFormWrap>
  );
};

export default Login;

const RegisterFormWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
  flex-direction: column;
  width: 80%;
  height: 550px;
  margin: 0 auto;
`;

const Logo = styled.h2`
  font-size: 50px;
`;

const RegisterForm = styled.form`
  ${({ theme }) => theme.flex('space-around', 'center')};
  flex-direction: column;
  height: 60%;
  margin-top: 20px;
`;

const InputWrap = styled.div`
  margin: 0 auto;
`;

const P = styled.p`
  width: 150px;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 20px;
`;

const Button = styled.button`
  width: 170px;
  height: 40px;
  margin: 0px 20px;
  border: none;
  border-radius: 3px;
  background-color: #0074e9;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
