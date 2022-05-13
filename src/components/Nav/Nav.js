import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  const [tokenSaved, setTokenSaved] = useState(false);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      setTokenSaved(true);
    } else if (token !== false) {
      setTokenSaved(false);
    }
  }, [token]);

  const goToMain = () => {
    navigate('/');
  };

  const alertLogin = () => {
    alert('로그인 후 이용해주시기 바랍니다');
    navigate('/login');
  };

  const goToMyPage = () => {
    tokenSaved ? navigate('/mypage') : alertLogin();
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const removeToken = () => {
    localStorage.removeItem('access_token');
    setTokenSaved(false);
    goToMain();
  };

  return (
    <NavWrap>
      <Logo onClick={goToMain}>Influence</Logo>
      <ButtonWrap>
        <MyPage onClick={goToMyPage}>마이페이지</MyPage>
        {tokenSaved ? (
          <Login onClick={removeToken}>로그아웃</Login>
        ) : (
          <Login onClick={goToLogin}>로그인</Login>
        )}
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
