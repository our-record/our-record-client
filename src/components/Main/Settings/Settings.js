import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { flexSet } from '../../../styles/mixin';
import { API } from '../../../config';

const Settings = ({ isOpen, setOpen }) => {
  const history = useHistory();
  const settingsElement = useRef();

  const handleClose = ({ target }) => {
    if (isOpen && !settingsElement.current.contains(target)) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClose);
    return () => {
      window.removeEventListener('mousedown', handleClose);
    };
  }, []);

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
      <LinkEl href={`http://${API}/user/logout`}>
        <MenuWrap>
          <IconImage alt="information" src="/icon/logout.png" />
          <ButtonText>로그아웃</ButtonText>
        </MenuWrap>
      </LinkEl>
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
  cursor: pointer;

  &:first-child {
    margin-bottom: 7px;
  }

  &:last-child {
    margin-top: 7px;
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

const LinkEl = styled.a`
  text-decoration: none;
`;

const ButtonText = styled.div`
  color: ${props => props.theme.basicGray};
  font-size: 12px;
`;

export default Settings;
