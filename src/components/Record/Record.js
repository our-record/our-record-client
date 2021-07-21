import React from 'react';
import styled from 'styled-components';
import {
  buttonSet,
  flexSet,
  dateInputSet,
  textInputSet,
} from '../../styles/mixin';

const Record = () => {
  return (
    <RecordWrap>
      <ContentsWrap>
        <MainTitle>
          2021년 7월 31일 엘리펀트빌리지에서의 기록을 남기세요
        </MainTitle>
        <ListWrap>
          <CategoryTitle>시간</CategoryTitle>
          <TimeInput type="time"></TimeInput>
        </ListWrap>
        <ListWrap>
          <CategoryTitle>비용</CategoryTitle>
          <CostWrap>
            <OptionSelect>
              <option value="">항목선택</option>
              <option value="food">식비</option>
              <option value="transportation">교통비</option>
              <option value="culture">문화비</option>
              <option value="etc">기타</option>
            </OptionSelect>
            <CostTextInput type="text" placeholder="내용입력" />
            <MoneyInputWrap>
              <MoneyInput type="text" placeholder="금액입력" />
              <div>원</div>
            </MoneyInputWrap>
          </CostWrap>
        </ListWrap>
        <ListWrap>
          <CategoryTitle>사진</CategoryTitle>
          <ProfileButton>사진업로드</ProfileButton>
        </ListWrap>
        <ListWrap>
          <CategoryTitle>스토리</CategoryTitle>
          <form>
            <StoryInput rows="5" cols="30" placeholder="내용을 입력하세요" />
          </form>
        </ListWrap>
        <div>
          <EnrollButton>등록</EnrollButton>
          <CancleButton>취소</CancleButton>
        </div>
      </ContentsWrap>
    </RecordWrap>
  );
};

const RecordWrap = styled.div`
  ${flexSet('row', 'center', 'center')}
  height: 100vh;
  background-color: ${props => props.theme.basicGray};
`;

const ContentsWrap = styled.div`
  width: 500px;
  height: 400px;
  padding: 35px 20px;
  border: ${props => props.theme.basicBorder};
  background-color: white;
  text-align: center;
`;

const MainTitle = styled.div`
  margin-bottom: 30px;
`;

const ListWrap = styled.div`
  ${flexSet('row', 'flex-start', 'flex-start')}
  margin-bottom: 15px;
`;
const CategoryTitle = styled.div`
  width: 50px;
  padding-top: 3px;
  font-size: 14px;
  text-align: left;
`;

const TimeInput = styled.input`
  ${dateInputSet}
`;

const CostWrap = styled.div`
  ${flexSet('column', 'flex-start', 'flex-start')}
`;

const OptionSelect = styled.select`
  ${textInputSet}
  margin-bottom: 5px;
`;

const MoneyInputWrap = styled.div`
  ${flexSet('row', 'flex-start', 'flex-end')}
  margin-top: 5px;
`;

const CostTextInput = styled.input`
  ${textInputSet}
`;

const MoneyInput = styled.input`
  ${textInputSet}
  margin-right: 5px;
`;

const ProfileButton = styled.button`
  ${buttonSet}
`;

const StoryInput = styled.textarea`
  ${textInputSet}
  width: 410px;
  resize: none;
`;

const EnrollButton = styled.button`
  width: 120px;
  margin-right: 10px;
  padding: 5px 0;
  border: 1px solid ${props => props.theme.keyColor};
  border-radius: 3px;
  color: ${props => props.theme.basicDarkGray};
  background-color: ${props => props.theme.keyColor};
  font-size: 14px;
  box-shadow: 2px 2px #ffa551;
  cursor: pointer;
`;

const CancleButton = styled.button`
  width: 120px;
  padding: 5px 0;
  ${buttonSet('14px')}
`;

export default Record;
