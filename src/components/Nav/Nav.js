import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Settings from './Settings/Settings';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Nav = coupleData => {
  const [isHomeActivate, setIsHomeActivate] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEventActivate, setIsEventActivate] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    location.pathname === '/'
      ? setIsHomeActivate(true)
      : setIsHomeActivate(false);

    location.pathname === '/anniversary'
      ? setIsEventActivate(true)
      : setIsEventActivate(false);
  }, []);

  return (
    <NavWrap>
      <MainTitle onClick={() => window.location.replace('/')}>
        Our Record
      </MainTitle>
      <RightWrap>
        <div>
          <HomeButton
            alt="home button"
            src={isHomeActivate ? '/icon/home-activated.png' : '/icon/home.png'}
            onClick={() => history.push('/')}
          />
          <AnniversaryButton
            alt="anniversary button"
            src={
              isEventActivate
                ? '/icon/calendar-activated.png'
                : '/icon/calendar.png'
            }
            onClick={() => history.push('/anniversary')}
          />
          <SettingButton
            alt="settings button"
            src="/icon/settings.png"
            onClick={() => setIsSettingsOpen(true)}
          />
          {isSettingsOpen && (
            <Settings
              isOpen={isSettingsOpen}
              setOpen={setIsSettingsOpen}
              isInvitor={coupleData.coupleData.invitor_nickname}
              isInvitee={coupleData.coupleData.invitee_nickname}
              coupleId={coupleData.coupleData._id}
            />
          )}
        </div>
      </RightWrap>
    </NavWrap>
  );
};

const NavWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  position: fixed;
  top: 0;
  width: 100%;
  height: 5vh;
  padding: 10px 0;
  border-bottom: ${props => props.theme.basicBorder};
  background-color: white;
  z-index: 100;
`;

const MainTitle = styled.div`
  padding-left: 35px;
  font-family: 'Anton', sans-serif;
  font-size: 22px;
  cursor: pointer;
`;

const RightWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  padding-right: 35px;
`;

const HomeButton = styled.img`
  width: 29px;
  padding-right: 10px;
  cursor: pointer;
`;

const AnniversaryButton = styled.img`
  width: 29px;
  padding-right: 10px;
  cursor: pointer;
`;

const SettingButton = styled.img`
  width: 20px;
  cursor: pointer;
`;

export default Nav;
