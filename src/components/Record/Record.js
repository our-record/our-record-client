import React from 'react';
import styled from 'styled-components';
import { buttonSet, flexSet } from '../../styles/mixin';

const Record = props => {
  const {
    isOpen,
    time,
    setTime,
    costCategory,
    setCostCategory,
    costContent,
    setCostContent,
    cost,
    setCost,
    picture,
    setPicture,
    story,
    setStory,
    notice,
    handleData,
    submitRecord,
    close,
    placeName,
    convertedDate,
  } = props;

  const showDate = () => {
    const year = convertedDate.substring(0, 4);
    const month = convertedDate.substring(5, 7);
    const date = convertedDate.substring(8, 10);

    return `${year}년 ${month[0] === '0' ? month.substr(1, 1) : month}월 ${
      date[0] === '0' ? date.substr(1, 1) : date
    }일`;
  };

  return (
    <div>
      {isOpen ? (
        <RecordWrap>
          <ContentsWrap>
            <form onSubmit={submitRecord} enctype="multipart/form-data">
              <MainTitle>
                {showDate()}
                {placeName ? ` ${placeName}에서` : ``}의 기록을 남기세요
              </MainTitle>
              <ListWrap>
                <CategoryTitle>
                  시간<Required>*</Required>
                </CategoryTitle>
                <TimeInput
                  type="time"
                  value={time}
                  onChange={e => handleData(e, setTime)}
                ></TimeInput>
              </ListWrap>
              <ListWrap>
                <CategoryTitle>
                  비용<Required>*</Required>
                </CategoryTitle>
                <CostWrap>
                  <OptionSelect
                    value={costCategory}
                    onChange={e => handleData(e, setCostCategory)}
                  >
                    <option value="">항목선택</option>
                    <option value="food">식비</option>
                    <option value="transportation">교통비</option>
                    <option value="culture">문화비</option>
                    <option value="etc">기타</option>
                  </OptionSelect>
                  <CostTextInput
                    type="text"
                    placeholder="내용입력"
                    value={costContent}
                    onChange={e => handleData(e, setCostContent)}
                  />
                  <MoneyInputWrap>
                    <MoneyInput
                      type="text"
                      placeholder="금액입력"
                      value={cost}
                      onChange={e => handleData(e, setCost, true)}
                    />
                    <WonText>원</WonText>
                  </MoneyInputWrap>
                </CostWrap>
              </ListWrap>
              <ListWrap>
                <CategoryTitle>사진</CategoryTitle>
                <PictureWrap>
                  <PictureLabel htmlFor="picture">파일선택</PictureLabel>
                  <PictureInput
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={e => setPicture(e.target.files[0])}
                  />
                  <PictureName className={picture && 'pictureNameOn'}>
                    {picture && picture.name}
                  </PictureName>
                </PictureWrap>
              </ListWrap>
              <ListWrap>
                <CategoryTitle>스토리</CategoryTitle>
                <StoryInput
                  rows="5"
                  cols="30"
                  placeholder="내용을 입력하세요"
                  value={story}
                  onChange={e => handleData(e, setStory)}
                />
              </ListWrap>
              <Notification className={notice && 'noticeOn'}>
                필수 내용을 입력해 주세요!
              </Notification>
              <div>
                <EnrollButton type="submit">등록</EnrollButton>
                <CancleButton onClick={close}>취소</CancleButton>
              </div>
            </form>
          </ContentsWrap>
        </RecordWrap>
      ) : null}
    </div>
  );
};

const RecordWrap = styled.div`
  ${flexSet('row', 'center', 'center')}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(120, 120, 120, 0.8);
`;

const ContentsWrap = styled.div`
  width: 500px;
  height: 420px;
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

const CostWrap = styled.div`
  ${flexSet('column', 'flex-start', 'flex-start')}
`;

const OptionSelect = styled.select`
  height: 18px;
  margin-bottom: 5px;
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

const MoneyInputWrap = styled.div`
  ${flexSet('row', 'flex-start', 'flex-end')}
  margin-top: 5px;
`;

const CostTextInput = styled.input`
  height: 18px;
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

const MoneyInput = styled.input`
  height: 18px;
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

const PictureWrap = styled.div`
  ${flexSet('row', 'flex-start', 'flex-start')}
`;

const PictureLabel = styled.label`
  width: 60px;
  ${buttonSet('12px')}
  margin-right: 10px;
  padding: 5px;
  text-align: center;
`;

const PictureInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 1px solid red;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

const PictureName = styled.div`
  display: none;

  &.pictureNameOn {
    display: inline-block;
    width: 330px;
    margin-top: 7px;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => props.theme.basicDarkGray};
    font-size: 12px;
    text-align: left;
  }
`;

const StoryInput = styled.textarea`
  width: 410px;
  resize: none;
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

const Notification = styled.div`
  visibility: hidden;

  &.noticeOn {
    visibility: visible;
    height: 20px;
    padding-bottom: 5px;
    color: red;
    font-size: 14px;
  }
`;

const EnrollButton = styled.button`
  width: 120px;
  margin-right: 5px;
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

const Required = styled.span`
  color: red;
`;

const WonText = styled.div`
  font-size: 14px;
  margin-left: 5px;
`;
export default Record;
