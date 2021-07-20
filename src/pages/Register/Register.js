import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Register = () => {
  return (
    <RegisterWrap>
      <LoginWrap>
        <MainTitle>Our Record</MainTitle>
        <SubTitle>둘 만의 소중한 순간을 기록하세요</SubTitle>
        <KakaoButton alt="kakao login" src="/images/register/kakao_login.png" />
        <GoogleButton
          alt="kakao login"
          src="/images/register/kakao_login.png"
        />
        <FacebookButton
          alt="kakao login"
          src="/images/register/kakao_login.png"
        />
      </LoginWrap>
    </RegisterWrap>
  );
};

const RegisterWrap = styled.div`
  ${flexSet('row', 'center', 'center')};
  height: 100vh;
`;

const LoginWrap = styled.div`
  width: 300px;
  height: 300px;
  padding: 40px 20px;
  border: 2px solid rgb(100, 100, 100);
  text-align: center;
`;

const MainTitle = styled.div`
  margin-bottom: 30px;
  font-family: 'Anton', sans-serif;
  font-size: 36px;
`;

const SubTitle = styled.div`
  margin-bottom: 40px;
  color: ${props => props.theme.basicDarkGray};
`;

const KakaoButton = styled.img`
  margin-bottom: 10px;
  cursor: pointer;
`;
const GoogleButton = styled.img`
  margin-bottom: 10px;
  cursor: pointer;
`;
const FacebookButton = styled.img`
  cursor: pointer;
`;

export default Register;
