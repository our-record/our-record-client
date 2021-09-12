import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { flexSet } from '../../../styles/mixin';
import { API } from '../../../api';

const Settings = ({ isOpen, setOpen, isInvitor, isInvitee, coupleId }) => {
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
  });

  const goInfoEdit = inviteCode => {
    if (isInvitor && isInvitee) {
      history.push('/information_edit');
    } else {
      isInvitor
        ? prompt(
            '상대방 정보 입력 완료 후 수정이 가능합니다. 아래 초대링크를 보내주세요.',
            inviteCode
          )
        : alert('상대방 정보 입력 완료 후 수정이 가능합니다.');
      setOpen(false);
    }
  };

  return (
    <SettingsWrap ref={settingsElement}>
      <MenuWrap onClick={() => goInfoEdit(`http://${API}/kakao/${coupleId}`)}>
        <IconImage alt="information" src="/icon/information.png" />
        <ButtonText>정보 변경</ButtonText>
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
  padding: 0 10px 7px 10px;
  border: ${props => props.theme.basicBorder};
  background-color: white;
  box-shadow: 1px 1px rgb(200, 200, 200);
`;

const MenuWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
  padding-top: 7px;
  cursor: pointer;

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
