import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    brand_name: '',
  });
  const [emailCheck, setEmailCheck] = useState(false);

  const { email, password, passwordCheck, brand_name } = inputValues;

  useEffect(() => {
    setEmailCheck(false);
  }, [email]);

  const changeValue = e => {
    const { name, value } = e.target;
    setInputValues(prestate => {
      return { ...prestate, [name]: value };
    });
  };
  const isEmail = email => {
    const emailRegex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return emailRegex.test(email);
  };
  const isPassword = password => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,25}$/;

    return passwordRegex.test(password);
  };
  const handleEmailCheck = () => {
    fetch('http://172.2.0.189:8000/user/check-email', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(res => {
      if (res.status === 200) {
        setEmailCheck(true);
        alert('사용가능한 이메일입니다.');
        return res.json();
      } else {
        alert('이미사용중인 이메일입니다.');
      }
    });
  };

  const postCreate = () => {
    if (!isEmail(email)) {
      alert('이메일 형식을 지켜주세요.');
    } else if (email.length > 40) {
      alert('이메일은 40자 이하로 입력해주세요.');
    } else if (!emailCheck) {
      alert('이메일 중복체크를 해주세요');
    } else if (!isPassword(password)) {
      alert('비밀번호는 영문, 숫자, 특수기호 조합으로 8~20 이상 입력해주세요');
    } else if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (!brand_name) {
      alert('회사명을 입력해주세요');
    } else if (brand_name.length > 20) {
      alert('회사명은 20자 이하로 입력해주세요');
    } else {
      fetch('http://172.2.0.189:8000/user/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          brandname: brand_name,
        }),
      }).then(res => {
        if (res.status === 201) {
          alert('가입을 축하합니다');
          navigate('/login');
        } else {
          alert('가입정보를 다시 확인해주세요');
        }
      });
    }
  };

  return (
    <RegisterFormWrap>
      <Logo>Influence</Logo>
      <Title>회원정보를 입력해주세요</Title>
      <RegisterForm>
        <InputWrap>
          <P>이메일</P>
          <EmailWrap>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={changeValue}
              placeholder="이메일"
            />
            <EmailCheckBtn type="button" onClick={handleEmailCheck}>
              중복체크
            </EmailCheckBtn>
          </EmailWrap>
        </InputWrap>
        {!email ? (
          ''
        ) : isEmail(email) && email.length < 41 ? (
          ''
        ) : (
          <False>이메일형식을 지켜주세요.</False>
        )}
        <InputWrap>
          <P>비밀번호</P>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={changeValue}
            placeholder="영문, 숫자, 특수기호 조합, 8~20자"
          />
        </InputWrap>
        {!password ? (
          ''
        ) : isPassword(password) ? (
          <Ture>사용가능한 비밀번호입니다.</Ture>
        ) : (
          <False>사용불가능한 비밀번호입니다.</False>
        )}

        <InputWrap>
          <P>비밀번호 확인</P>
          <Input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={changeValue}
            placeholder="비밀번호 확인"
          />
        </InputWrap>
        {!(passwordCheck && password) ? (
          ''
        ) : password === passwordCheck ? (
          <Ture>비밀번호가 일치합니다.</Ture>
        ) : (
          <False>비밀번호가 일치하지 않습니다.</False>
        )}
        <InputWrap>
          <P>회사명(법인명)</P>
          <Input
            type="text"
            name="brand_name"
            value={brand_name}
            onChange={changeValue}
            placeholder="회사명(법인명)"
          />
        </InputWrap>
        {!brand_name ? (
          ''
        ) : brand_name.length < 21 ? (
          ''
        ) : (
          <False>회사명은 20자 이하로 입력해주세요.</False>
        )}
        <InputWrap>
          <Button type="button" onClick={postCreate}>
            승인요청
          </Button>
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
  padding-right: 45px;
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
  margin: 5px auto;
`;

const EmailWrap = styled.div`
  position: relative;
  ${props => props.theme.flex('', 'center')}
`;

const EmailCheckBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 30px;
  top: 15px;
  right: -90px;
  border: none;
  background-color: #0074e9;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
`;

const P = styled.p`
  width: 150px;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 390px;
  height: 40px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 20px;

  ::placeholder {
    font-size: 15px;
  }
`;

const Ture = styled.span`
  margin-top: 5px;
  color: green;
`;

const False = styled.span`
  margin-top: 5px;
  color: red;
`;

const Button = styled.button`
  width: 390px;
  height: 40px;
  margin-top: 20px;
  border: none;
  background-color: #0074e9;
  color: #ffffff;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default Register;
