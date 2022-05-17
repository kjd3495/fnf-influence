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
        if (res.message === 'Invalid email') {
          alert('존재하지 않는 이메일 입니다.');
        } else if (res.message === 'Invalid password') {
          alert('비밀번호가 일치하지 않습니다.');
        } else if (res.message === 'Login success') {
          localStorage.setItem('access_token', res.token);
          navigate('/');
        }
      });
  };

  const changeValue = e => {
    const { name, value } = e.target;
    setInputValues(prestate => {
      return { ...prestate, [name]: value };
    });
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const isEmail = email => {
    const emailRegex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return emailRegex.test(email);
  };

  const enterEvent = e => {
    if (e.key === 'Enter') {
      loginHandler();
    }
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
            onKeyUp={enterEvent}
          />
        </InputWrap>
        {!inputValues.email ? (
          ''
        ) : isEmail(inputValues.email) && inputValues.email.length < 41 ? (
          ''
        ) : (
          <False>이메일형식을 지켜주세요.</False>
        )}
        <InputWrap>
          <P>비밀번호</P>
          <Input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={changeValue}
            onKeyUp={enterEvent}
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

const False = styled.span`
  color: red;
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
