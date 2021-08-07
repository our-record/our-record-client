import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import LinkCopy from '../../components/Information/LinkCopy';
import styled from 'styled-components';
import { buttonSet, flexSet } from '../../styles/mixin';
import axios from 'axios';
import { API } from '../../config';

const Information = () => {
  const [today, setToday] = useState();
  const [hangoutDate, setHangoutDate] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [invitedBirthday, setInvitedBirthday] = useState('');
  const [nickName, setNickName] = useState('');
  const [invitedNickName, setInvitedNickName] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [inputNotification, setInputNotification] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    if (date < 10) {
      date = '0' + date;
    }

    if (month < 10) {
      month = '0' + month;
    }

    setToday(`${year}-${month}-${date}`);
  }, []);

  const handleInformation = (event, setData, validation) => {
    const { value } = event.target;
    validation ? value.length < 7 && setData(value) : setData(value);
  };

  const checkInformation = e => {
    e.preventDefault();

    if (location.search.length !== 0) {
      const invitorCondition =
        hangoutDate && birthDay && birthDay && profileImage;
      invitorCondition ? submitInformation() : setInputNotification(true);
    } else {
      const inviteeCondition = invitedBirthday && invitedNickName;
      inviteeCondition ? submitInformation() : setInputNotification(true);
    }
  };

  const submitInformation = () => {
    const userData = new FormData();

    if (location.search.length !== 0) {
      userData.append('dday', hangoutDate);
      userData.append('invitor_birth', birthDay);
      userData.append('couple_img', profileImage);
      userData.append('invitor_nickname', nickName);
    } else {
      userData.append('invitee_birth', invitedBirthday);
      userData.append('invitee_nickname', invitedNickName);
    }

    for (let key of userData.values()) {
      console.log(key);
    }

    axios({
      url: `http://${API}/user/register-info`,
      method: 'post',
      headers: { _id: location.search.slice(6) },
      data: userData,
      withCredentials: true,
    }).then(res => {
      alert('정보 입력이 완료되었습니다');
      history.push('/');
    });
  };

  return (
    <InformationWrap>
      <ContentsWrap>
        <MainTitle>정보를 입력해 주세요</MainTitle>
        <form onSubmit={checkInformation} enctype="multipart/form-data">
          {location.search.length !== 0 ? (
            <>
              <CategoryWrap>
                <CategoryTitle>커플</CategoryTitle>
                <InputWrap>
                  <ListWrap>
                    <div>
                      <Label>초대링크</Label>
                      <LinkCopy
                        text={`http://${API}/kakao/${location.search.slice(6)}`}
                      />
                    </div>
                    <LinkWrap>
                      <InviteLink>
                        {`http://${API}/kakao/${location.search.slice(6)}`}
                      </InviteLink>
                      <LinkNotice>
                        (!) 상대방에게 초대링크를 보내주세요
                      </LinkNotice>
                    </LinkWrap>
                  </ListWrap>
                  <ListWrap>
                    <Label>사귄날짜</Label>
                    <DateInput
                      type="date"
                      value={hangoutDate}
                      max={today}
                      onChange={e => handleInformation(e, setHangoutDate)}
                    />
                  </ListWrap>
                  <ListWrap>
                    <Label>프로필</Label>
                    <ProfileInputWrap>
                      <ProfileInputLabel htmlFor="profile">
                        파일선택
                      </ProfileInputLabel>
                      <ProfileInput
                        id="profile"
                        type="file"
                        accept="image/*"
                        onChange={e => setProfileImage(e.target.files[0])}
                      />
                      <ProfileName className={profileImage && 'profileNameOn'}>
                        {profileImage && profileImage.name}
                      </ProfileName>
                    </ProfileInputWrap>
                  </ListWrap>
                </InputWrap>
              </CategoryWrap>
              <CategoryWrap>
                <CategoryTitle>개인</CategoryTitle>
                <InputWrap>
                  {' '}
                  <ListWrap>
                    <Label>생년월일</Label>
                    <DateInput
                      type="date"
                      max={today}
                      defaultValue={birthDay}
                      onChange={e => handleInformation(e, setBirthDay)}
                    />
                  </ListWrap>
                  <ListWrap>
                    <Label>닉네임</Label>
                    <NickNameWrap>
                      <NickNameInput
                        type="text"
                        placeholder="훌라춤감자맘"
                        value={nickName}
                        onChange={e => handleInformation(e, setNickName, true)}
                      />
                      <TextCount>{nickName.length}/8</TextCount>
                    </NickNameWrap>
                  </ListWrap>
                </InputWrap>
              </CategoryWrap>
            </>
          ) : (
            <>
              <CategoryWrap>
                <CategoryTitle>개인</CategoryTitle>
                <InputWrap>
                  {' '}
                  <ListWrap>
                    <Label>생년월일</Label>
                    <DateInput
                      type="date"
                      max={today}
                      defaultValue={invitedBirthday}
                      onChange={e => handleInformation(e, setInvitedBirthday)}
                    />
                  </ListWrap>
                  <ListWrap>
                    <Label>닉네임</Label>
                    <NickNameWrap>
                      <NickNameInput
                        type="text"
                        placeholder="훌라춤감자맘"
                        value={invitedNickName}
                        onChange={e =>
                          handleInformation(e, setInvitedNickName, true)
                        }
                      />
                      <TextCount>{invitedNickName.length}/8</TextCount>
                    </NickNameWrap>
                  </ListWrap>
                </InputWrap>
              </CategoryWrap>
            </>
          )}
          <Notification className={inputNotification && 'noticeOn'}>
            내용을 모두 입력해 주세요!
          </Notification>
          <SubmitButton type="submit">등록</SubmitButton>
        </form>
      </ContentsWrap>
    </InformationWrap>
  );
};

const InformationWrap = styled.div`
  ${flexSet('column', 'flex-start', 'center')}
  height: 100vh;
  padding: 70px 0;
`;

const ContentsWrap = styled.div`
  width: 260px;
  padding: 0 10px;
`;

const MainTitle = styled.div`
  margin-bottom: 40px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const CategoryWrap = styled.h1`
  ${flexSet('column')}
  margin: 30px 0;
`;

const CategoryTitle = styled.div`
  width: 100%;
  margin: 0 20px 15px 0;
  color: ${props => props.theme.basicDarkGray};
  font-size: 18px;
  font-weight: bold;
`;

const InputWrap = styled.div`
  margin-bottom: 5px;
`;

const ListWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
  margin: 15px 0;
`;

const Label = styled.div`
  width: 70px;
  color: ${props => props.theme.basicDarkGray};
`;

const DateInput = styled.input`
  width: 170px;
  height: 18px;
  appearance: none;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicDarkGray};

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
  }
`;

const ProfileInputWrap = styled.div`
  ${flexSet('column', 'flex-start', 'flex-start')}
`;

const ProfileInputLabel = styled.label`
  width: 60px;
  ${buttonSet('12px')}
  padding: 5px;
  text-align: center;
`;

const ProfileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 1px solid red;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

const ProfileName = styled.div`
  display: none;

  &.profileNameOn {
    display: inline-block;
    width: 170px;
    margin-top: 7px;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => props.theme.basicDarkGray};
    font-size: 12px;
  }
`;

const NickNameWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
`;

const NickNameInput = styled.input`
  width: 145px;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicDarkGray};

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.basicGray};
  }
`;

const TextCount = styled.div`
  margin-left: 5px;
  color: ${props => props.theme.basicGray};
  font-size: 12px;
`;

const Notification = styled.div`
  visibility: hidden;
  height: 20px;

  &.noticeOn {
    visibility: visible;
    color: red;
    font-size: 12px;
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 3px;
  color: ${props => props.theme.basicDarkGray};
  background-color: ${props => props.theme.keyColor};
  box-shadow: 2px 2px #ffc7b5;
  font-size: 16px;
  cursor: pointer;
`;

const LinkWrap = styled.div`
  width: 173px;
`;

const InviteLink = styled.div`
  width: 100%;
  word-break: break-all;
  font-size: 12px;
`;

const LinkNotice = styled.div`
  margin-top: 3px;
  color: red;
  font-size: 10px;
`;

export default Information;
