import React from 'react';
import styled from 'styled-components';
import {
  buttonSet,
  flexSet,
  textInputSet,
  dateInputSet,
} from '../../styles/mixin';

const Information = () => {
  return (
    <InformationWrap>
      <ContentsWrap>
        <MainTitle>정보를 입력해 주세요</MainTitle>
        <CategoryWrap>
          <CategoryTitle>커플</CategoryTitle>
          <InputWrap>
            <ListWrap>
              <Label>사귄날짜</Label>
              <DateInput type="date"></DateInput>
            </ListWrap>
            <ListWrap>
              <Label>프로필</Label>
              <ProfileButton>사진업로드</ProfileButton>
            </ListWrap>
          </InputWrap>
        </CategoryWrap>
        <CategoryWrap>
          <CategoryTitle>여성</CategoryTitle>
          <InputWrap>
            {' '}
            <ListWrap>
              <Label>생년월일</Label>
              <DateInput type="date"></DateInput>
            </ListWrap>
            <ListWrap>
              <Label>닉네임</Label>
              <NickNameWrap>
                <NickNameInput type="text" placeholder="훌라춤감자맘" />
                <TextCount>0/6</TextCount>
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
              <DateInput type="date"></DateInput>
            </ListWrap>
            <ListWrap>
              <Label>닉네임</Label>
              <NickNameWrap>
                <NickNameInput type="text" placeholder="콧수염아저씨" />
                <TextCount>0/6</TextCount>
              </NickNameWrap>
            </ListWrap>
          </InputWrap>
        </CategoryWrap>
        <Notification>내용을 모두 입력해 주세요!</Notification>
        <SubmitButton>등록</SubmitButton>
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
  width: 80px;
  color: ${props => props.theme.basicDarkGray};
`;

const DateInput = styled.input`
  ${dateInputSet}
`;

const ProfileButton = styled.button`
  ${buttonSet}
`;

const NickNameWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
`;

const NickNameInput = styled.input`
  ${textInputSet}
`;

const TextCount = styled.div`
  margin-left: 5px;
  color: ${props => props.theme.basicGray};
  font-size: 12px;
`;

const Notification = styled.div`
  margin-bottom: 10px;
  color: red;
  font-size: 12px;
  text-align: center;
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
