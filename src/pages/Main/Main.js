import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Record from '../../components/Record/Record';
import {
  tableSet,
  tableHeadSet,
  tableDataSet,
  bottomTableDataSet,
  buttonSet,
  flexSet,
} from '../../styles/mixin';

const Main = () => {
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [time, setTime] = useState();
  const [costCategory, setCostCategory] = useState();
  const [costContent, setCostContent] = useState();
  const [cost, setCost] = useState();
  const [picture, setPicture] = useState();
  const [story, setStory] = useState();
  const [notice, setNotice] = useState(false);

  const handleData = (event, setData, isCost) => {
    const { value } = event.target;
    isCost
      ? setData(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1'))
      : setData(value);
  };

  const submitRecord = () => {
    const conditions = time && costCategory && costContent && cost;
    conditions
      ? window.confirm('기록을 등록하시겠습니까?') && enrollRecord()
      : setNotice(true);
  };

  const enrollRecord = () => {
    initializeRecord();

    axios
      .post('api', {
        header: 'token',
        date: 'data',
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  const closeRecord = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      setIsRecordOpen(false);
      initializeRecord();
    }
  };

  const initializeRecord = () => {
    setTime('');
    setCostCategory('');
    setCostContent('');
    setCost('');
    setPicture('');
    setStory('');
    setNotice('');
  };

  return (
    <>
      <NavWrap>
        <MainTitle>Our Record</MainTitle>
        <RightWrap>
          <AlarmMessageWrap>
            <AlarmImage alt="alarm" src="/icon/notification-red.png" />
            <AlarmText>[11월 11일] 우리의 200일 😍 </AlarmText>
          </AlarmMessageWrap>
          <div>
            <HomeButton alt="home button" src="/icon/home-black.png" />
            <SettingButton alt="settings button" src="/icon/settings.png" />
          </div>
        </RightWrap>
      </NavWrap>
      <BodyWrap>
        <SideWrap>
          <ProfileImage alt="profile" src="/images/main/meongmoongs.png" />
          <NickNameWrap>
            <span>훌라춤감자맘</span>
            <HeartIcon alt="heart" src="/icon/heart.png" />{' '}
            <span>콧수염아저씨</span>
          </NickNameWrap>
          <DDay>D + 100일</DDay>
          <RecordCalendar>달력</RecordCalendar>
          <RecordButton onClick={() => setIsRecordOpen(true)}>
            기록하기
          </RecordButton>
          <Record
            isOpen={isRecordOpen}
            time={time}
            setTime={setTime}
            costCategory={costCategory}
            setCostCategory={setCostCategory}
            costContent={costContent}
            setCostContent={setCostContent}
            cost={cost}
            setCost={setCost}
            picture={picture}
            setPicture={setPicture}
            story={story}
            setStory={setStory}
            notice={notice}
            handleData={handleData}
            submitRecord={submitRecord}
            close={closeRecord}
          />
          <StatisticsButton>이 달의 통계</StatisticsButton>
        </SideWrap>
        <ContentsWrap>
          <MapWrap>map</MapWrap>
          <ListWrap>
            <ListTitle>그 날의 기록</ListTitle>
            <ListTable>
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <tr>
                <TableHead>스토리</TableHead>
                <TableHead>시간</TableHead>
                <TableHead>장소</TableHead>
                <TableHead>항목</TableHead>
                <TableHead>내용</TableHead>
                <TableHead>사용금액</TableHead>
                <TableHead>삭제/수정</TableHead>
              </tr>
              <tr>
                <TableData>
                  <StoryImage alt="story" src="/icon/binoculars.png" />
                </TableData>
                <TableData>13:00</TableData>
                <TableData>여장군 죽전</TableData>
                <TableData>식비</TableData>
                <TableData>고기 5인분, 소주</TableData>
                <TableData>50,000원</TableData>
                <TableData>
                  <DeleteImage alt="delete" src="/icon/delete.png" />
                  <EditImage alt="edit" src="/icon/edit.png" />
                </TableData>
              </tr>
              <tr>
                <BottomTableData colSpan="5">합계</BottomTableData>
                <BottomTableData>50,000원</BottomTableData>
                <BottomTableData className="allDeleteButton">
                  전체삭제
                </BottomTableData>
              </tr>
            </ListTable>
          </ListWrap>
        </ContentsWrap>
      </BodyWrap>
    </>
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
  padding-left: 45px;
  font-family: 'Anton', sans-serif;
  font-size: 22px;
`;

const RightWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  padding-right: 45px;
`;

const AlarmMessageWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  margin-right: 50px;
`;

const AlarmImage = styled.img`
  width: 22px;
  margin-right: 10px;
`;

const AlarmText = styled.div`
  width: 200px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 14px;
  text-decoration: underline;
`;

const HomeButton = styled.img`
  width: 22px;
  padding-right: 10px;
  cursor: pointer;
`;

const SettingButton = styled.img`
  width: 22px;
  cursor: pointer;
`;

const BodyWrap = styled.div`
  ${flexSet('row', 'space-between')}
  padding: 0 45px;
`;

const SideWrap = styled.div`
  ${flexSet('column', 'flex-start', 'center')}
  height: 95vh;
  padding: 15vh 45px 30px 0;
  border-right: ${props => props.theme.basicBorder};
`;

const ProfileImage = styled.img`
  width: 150px;
  margin-bottom: 10px;
  padding: 3px;
  border: ${props => props.theme.basicBorder};
  border-radius: 50%;
`;

const NickNameWrap = styled.div`
  ${flexSet('row', 'center', 'center')}
  margin: 10px 0;
  font-size: 14px;
`;

const HeartIcon = styled.img`
  width: 22px;
  margin: 0 5px;
`;

const DDay = styled.div``;

const RecordCalendar = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px 0 10px 0;
  border: ${props => props.theme.basicBorder};
`;

const RecordButton = styled.button`
  width: 200px;
  margin: 5px 0;
  padding: 3px 0;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 3px;
  color: ${props => props.theme.basicDarkGray};
  background-color: white;
  font-size: 12px;
  box-shadow: 1px 1px rgb(200, 200, 200);
  cursor: pointer;
`;

const StatisticsButton = styled.button`
  width: 200px;
  padding: 3px 0;
  ${buttonSet}
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 15vh 0 30px 45px;
`;

const MapWrap = styled.div`
  height: 65vh;
  margin-bottom: 40px;
  border: ${props => props.theme.basicBorder};
`;

const ListWrap = styled.div``;

const ListTitle = styled.div`
  margin-bottom: 15px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 20px;
  font-weight: bold;
`;

const ListTable = styled.table`
  ${tableSet('100%')}
`;

const TableHead = styled.th`
  ${tableHeadSet}
`;

const TableData = styled.td`
  ${tableDataSet}
`;

const BottomTableData = styled.td`
  ${bottomTableDataSet}

  &.allDeleteButton {
    cursor: pointer;
  }
`;

const StoryImage = styled.img`
  width: 22px;
  cursor: pointer;
`;

const DeleteImage = styled.img`
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
`;

const EditImage = styled.img`
  width: 16px;
  cursor: pointer;
`;

export default Main;
