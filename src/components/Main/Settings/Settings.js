import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { flexSet } from '../../../styles/mixin';
import { API } from '../../../config';

const Settings = ({ isOpen, setOpen }) => {
  const history = useHistory();
  const settingsElement = useRef();

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  const handleClose = ({ target }) => {
    if (isOpen && !settingsElement.current.contains(target)) setOpen(false);
  };

  return (
    <SettingsWrap ref={settingsElement}>
      <MenuWrap onClick={() => history.push('/information_edit')}>
        <IconImage alt="information" src="/icon/information.png" />
        <ButtonText>정보 변경</ButtonText>
      </MenuWrap>
      <MenuWrap onClick={() => history.push('/anniversary')}>
        <IconImage alt="information" src="/icon/anniversary.png" />
        <ButtonText>기념일 설정</ButtonText>
      </MenuWrap>
      <a href={`http://${API}/user/logout`}>
        <MenuWrap>
          <IconImage alt="information" src="/icon/logout.png" />
          <ButtonText>로그아웃</ButtonText>
        </MenuWrap>
      </a>
    </SettingsWrap>
  );
};

const SettingsWrap = styled.div`
  position: absolute;
  top: 4.7vh;
  right: 35px;
  width: 120px;
  padding: 7px 10px;
  border: ${props => props.theme.basicBorder};
  background-color: white;
  box-shadow: 1px 1px rgb(200, 200, 200);
`;

const MenuWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
  margin-top: 7px;
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  &:hover > div {
    color: ${props => props.theme.basicDarkGray};
  }

  &:hover > img {
    opacity: 1;
  }
`;

const IconImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  opacity: 0.5;
`;

const ButtonText = styled.div`
  color: ${props => props.theme.basicGray};
  font-size: 12px;
`;

export default Settings;
