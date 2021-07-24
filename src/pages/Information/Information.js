import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { buttonSet, flexSet } from '../../styles/mixin';

const Information = () => {
  const [today, setToday] = useState();
  const [hangoutDate, setHangoutDate] = useState('');
  const [femaleBirthDay, setFemaleBirthDay] = useState('');
  const [maleBirthDay, setMaleBirthDay] = useState();
  const [femaleNickName, setFemaleNickName] = useState('');
  const [maleNickName, setMaleNickName] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [inputNotification, setInputNotification] = useState(false);

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

  const submitInformation = () => {
    const conditions =
      hangoutDate &&
      femaleBirthDay &&
      maleBirthDay &&
      femaleNickName &&
      maleNickName &&
      profileImage;

    conditions ? console.log('ok') : setInputNotification(true);
  };

  return (
    <InformationWrap>
      <ContentsWrap>
        <MainTitle>정보를 입력해 주세요</MainTitle>
        <CategoryWrap>
          <CategoryTitle>커플</CategoryTitle>
          <InputWrap>
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
          <CategoryTitle>여성</CategoryTitle>
          <InputWrap>
            {' '}
            <ListWrap>
              <Label>생년월일</Label>
              <DateInput
                type="date"
                max={today}
                defaultValue={femaleBirthDay}
                onChange={e => handleInformation(e, setFemaleBirthDay)}
              />
            </ListWrap>
            <ListWrap>
              <Label>닉네임</Label>
              <NickNameWrap>
                <NickNameInput
                  type="text"
                  placeholder="훌라춤감자맘"
                  value={femaleNickName}
                  onChange={e => handleInformation(e, setFemaleNickName, true)}
                />
                <TextCount>{femaleNickName.length}/6</TextCount>
              </NickNameWrap>
            </ListWrap>
          </InputWrap>
        </CategoryWrap>
        <CategoryWrap>
          <CategoryTitle>남성</CategoryTitle>
          <InputWrap>
            {' '}
            <ListWrap>
              <Label>생년월일</Label>
              <DateInput
                type="date"
                max={today}
                value={maleBirthDay}
                onChange={e => handleInformation(e, setMaleBirthDay)}
              />
            </ListWrap>
            <ListWrap>
              <Label>닉네임</Label>
              <NickNameWrap>
                <NickNameInput
                  type="text"
                  placeholder="콧수염아저씨"
                  value={maleNickName}
                  onChange={e => handleInformation(e, setMaleNickName, true)}
                />
                <TextCount>{maleNickName.length}/6</TextCount>
              </NickNameWrap>
            </ListWrap>
          </InputWrap>
        </CategoryWrap>
        <Notification className={inputNotification && 'noticeOn'}>
          내용을 모두 입력해 주세요!
        </Notification>
        <SubmitButton onClick={submitInformation}>등록</SubmitButton>
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
  margin: 10px 0;
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

export default Information;
