import React, { useState } from 'react';
import styled from 'styled-components';

const Register = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    brand_name: '',
  });

  const changeValue = e => {
    const { name, value } = e.target;
    setInputValues(prestate => {
      return { ...prestate, [name]: value };
    });
  };
  return (
    <RegisterFormWrap>
      <Logo>Influence</Logo>
      <Title>회원정보를 입력해주세요</Title>
      <RegisterForm>
        <InputWrap>
          <P>이메일</P>
          <Input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={changeValue}
            placeholder="이메일형식은 @ .com을 포함해주세요"
          />
        </InputWrap>
        <InputWrap>
          <P>패스워드</P>
          <Input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={changeValue}
            placeholder="비밀번호"
          />
        </InputWrap>
        <InputWrap>
          <P>회사명(법인명)</P>
          <Input
            type="text"
            name="brand_name"
            value={inputValues.brand_name}
            onChange={changeValue}
            placeholder="회사명(법인명)"
          />
        </InputWrap>
        <InputWrap>
          <Button type="button">승인요청</Button>
        </InputWrap>
      </RegisterForm>
    </RegisterFormWrap>
  );
};
const RegisterFormWrap = styled.div`
  ${props => props.theme.flex('center', 'center')};
  flex-direction: column;
  width: 80%;
  height: 650px;
  margin: 0 auto;
`;

const Logo = styled.h2`
  font-size: 50px;
`;

const Title = styled.p`
  padding-top: 30px;
  font-size: 20px;
`;

const RegisterForm = styled.form`
  ${props => props.theme.flex('space-around', 'center')};
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
  border-radius: 3px;
  font-size: 20px;
`;

const Button = styled.button`
  width: 400px;
  height: 40px;
  background-color: #0074e9;
  color: #ffffff;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
`;

export default Register;
