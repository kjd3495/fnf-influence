import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToLogin = () => {
    navigate('login');
  };

  return (
    <NavWrap>
      <Logo onClick={goToMain}>Influence</Logo>
      <ButtonWrap>
        <MyPage onClick={goToMyPage}>마이페이지</MyPage>
        <Login onClick={goToLogin}>로그인</Login>
      </ButtonWrap>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center')}
  padding: 2vh 3vw;
`;

const Logo = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
`;

const MyPage = styled.button`
  width: 90px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const Login = styled.button`
  width: 70px;
  border: none;
  background-color: white;
  cursor: pointer;
`;
