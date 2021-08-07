import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Record from '../../components/Record/Record';
import Story from '../../components/Story/Story';
import SearchPlace from '../../components/Main/Map/SearchPlace';
import Settings from '../../components/Main/Settings/Settings';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import {
  tableSet,
  tableHeadSet,
  tableDataSet,
  bottomTableDataSet,
  buttonSet,
  flexSet,
} from '../../styles/mixin';
import { API, COST_CATEGORY } from '../../config';

const Main = () => {
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isRecordEditOpen, setIsRecordEditOpen] = useState(false);
  const [recordId, setRecordId] = useState();
  const [time, setTime] = useState();
  const [costCategory, setCostCategory] = useState();
  const [costContent, setCostContent] = useState();
  const [cost, setCost] = useState();
  const [picture, setPicture] = useState();
  const [story, setStory] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [notice, setNotice] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState();
  const [placeName, setPlaceName] = useState();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [dailyRecordData, setDailyRecordData] = useState();
  const [coupleData, setCoupleData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyData, setStoryData] = useState();
  const [isSettingsOpen, setIsSettingsOpen] = useState();

  useEffect(() => {
    const year = calendarDate.getFullYear();
    const month = `0${calendarDate.getMonth() + 1}`.slice(-2);
    const date = `0${calendarDate.getDate()}`.slice(-2);
    setConvertedDate(`${year}-${month}-${date}`);

    // showRecord();
    // json파일로 작업하기 위한 코드
    axios({
      url: 'http://localhost:3000/data/main/record.json',
      method: 'get',
    }).then(res => {
      console.log(res.data.data[0]);
      if (res.data.data[0].post) {
        setDailyRecordData(res.data.data[0].post);
        calculateTotalCost(res.data.data[0].post);
      } else {
        setDailyRecordData('');
      }
      setCoupleData(res.data.data[0].user);
      setIsLoading(false);
    });
  }, [calendarDate]);

  const showRecord = () => {
    axios({
      url: `http://${API}/`,
      method: 'post',
      data: convertedDate,
      withCredentials: true,
    }).then(res => {
      if (res.data[0].post) {
        setDailyRecordData(res.data[0].post);
        calculateTotalCost(res.data[0].post);
      } else {
        setDailyRecordData('');
      }
      setCoupleData(res.data[0].user);
      setIsLoading(false);
    });
  };

  const handleData = (event, setData, isCost) => {
    const { value } = event.target;
    isCost
      ? setData(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1'))
      : setData(value);
  };

  const getDDay = () => {
    const year = calendarDate.getFullYear();
    const month = `0${calendarDate.getMonth() + 1}`.slice(-2);
    const date = `0${calendarDate.getDate()}`.slice(-2);
    setConvertedDate(`${year}-${month}-${date}`);
  };

  const submitRecord = e => {
    e.preventDefault();

    const conditions = time && costContent && cost && costCategory;

    conditions
      ? window.confirm('기록을 등록하시겠습니까?') && enrollRecord()
      : setNotice(true);
  };

  const enrollRecord = () => {
    const recordData = new FormData();

    if (recordId) {
      recordData.append('_id', recordId);
      picture && recordData.append('datePhoto', picture);
    } else {
      recordData.append('place', placeName);
      recordData.append('datePhoto', picture);
      recordData.append('date', convertedDate);
      recordData.append('longitude', long);
      recordData.append('latitude', lat);
    }

    recordData.append('time', time);
    recordData.append('category', costCategory);
    recordData.append('expenseInfo', costContent);
    recordData.append('expense', cost);
    recordData.append('story', story);

    axios({
      url: `http://${API}/post/${recordId ? `edit` : `write`}`,
      method: 'post',
      data: recordData,
      withCredentials: true,
    }).then(res => {
      alert('정보 입력이 완료되었습니다');
      getRecord();
      closeRecord();
    });
  };

  const cancleRecord = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      closeRecord();
    }
  };

  const closeRecord = () => {
    setIsRecordOpen(false);
    setIsRecordEditOpen(false);
    initializeRecord();
  };

  const initializeRecord = () => {
    setTime();
    setCostCategory();
    setCostContent();
    setCost();
    setPicture();
    setStory();
    setRecordId();
    setRecordId();
    setNotice(false);
  };

  const calculateTotalCost = data => {
    const sumResult = data.reduce((pre, crr) => pre + crr.expense, 0);
    setTotalCost(sumResult);
  };

  const deleteRecord = (event, id) => {
    if (window.confirm('기록을 삭제하시겠습니까?')) {
      const filtered = dailyRecordData.filter(
        data => data._id !== event.target.id
      );

      setDailyRecordData(filtered);
      calculateTotalCost(filtered);

      axios({
        url: `http://${API}/post/remove`,
        method: 'post',
        data: { convertedDate, id },
        withCredentials: true,
      }).then(res => {
        alert('기록이 삭제되었습니다.');
      });
    }
  };

  const deleteAllRecord = () => {
    if (window.confirm('기록 전체를 삭제하시겠습니까?')) {
      setDailyRecordData('');

      axios({
        url: `http://${API}/post/remove-all`,
        method: 'post',
        data: convertedDate,
        withCredentials: true,
      }).then(res => {
        alert('기록이 삭제되었습니다.');
      });
    }
  };

  const openStory = (event, id) => {
    setStoryData(dailyRecordData.filter(data => data._id === event.target.id));
    setIsStoryOpen(true);
  };

  const closeStory = () => {
    setIsStoryOpen(false);
  };

  const editRecord = (event, id) => {
    const selectedRecord = dailyRecordData.filter(
      data => data._id === event.target.id
    )[0];

    setRecordId(selectedRecord._id);
    setTime(selectedRecord.time);
    setCostCategory(COST_CATEGORY[selectedRecord.category]);
    setCostContent(selectedRecord.expenseInfo);
    setCost(selectedRecord.expense);
    setStory(selectedRecord.story);
    setPlaceName(selectedRecord.place);
    setIsRecordEditOpen(true);
  };

  const getRecord = () => {
    axios({
      url: `http://${API}/post/list`,
      method: 'post',
      data: convertedDate,
    }).then(res => setDailyRecordData(res.data));
  };

  if (isLoading) {
    return (
      <div>
        <h1>데이터를 불러오는 중입니다...</h1>
      </div>
    );
  }

  return (
    <>
      <NavWrap>
        <MainTitle>Our Record</MainTitle>
        <RightWrap>
          <AlarmMessageWrap>
            <AlarmImage alt="alarm" src="/icon/notification-red.png" />
            <AlarmText>가까운 기념일이 없습니다</AlarmText>
          </AlarmMessageWrap>
          <div>
            <HomeButton alt="home button" src="/icon/home-black.png" />
            <SettingButton
              alt="settings button"
              src="/icon/settings.png"
              onClick={() => setIsSettingsOpen(true)}
            />
            {isSettingsOpen && (
              <Settings isOpen={isSettingsOpen} setOpen={setIsSettingsOpen} />
            )}
          </div>
        </RightWrap>
      </NavWrap>
      <BodyWrap>
        <SideWrap>
          <ProfileImage
            alt="profile"
            src={`${
              coupleData && coupleData.couple_img
                ? coupleData.couple_img
                : '/icon/couple.png'
            }`}
          />
          <NickNameWrap>
            {coupleData && coupleData.invitor_nickname ? (
              <NickName>{coupleData.invitor_nickname}</NickName>
            ) : (
              <NoNickName> 등록해 주세요</NoNickName>
            )}
            <HeartIcon alt="heart" src="/icon/heart.png" />{' '}
            {coupleData && coupleData.invitee_nickname ? (
              <NickName>{coupleData.invitee_nickname}</NickName>
            ) : (
              <NoNickName> 등록해 주세요</NoNickName>
            )}
          </NickNameWrap>
          <DDay>{coupleData && coupleData.dday ? 'D + 100일' : ''}</DDay>
          <RecordCalendar>
            <Calendar
              value={calendarDate}
              maxDate={new Date()}
              onChange={date => setCalendarDate(date)}
            />
          </RecordCalendar>
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
            close={cancleRecord}
            placeName={placeName}
            convertedDate={convertedDate}
          />
          <StatisticsButton>이 달의 통계</StatisticsButton>
        </SideWrap>
        <ContentsWrap>
          <MapWrap>
            <SearchPlace
              setPlaceName={setPlaceName}
              setLong={setLong}
              setLat={setLat}
              calendarDate={calendarDate}
              convertedDate={convertedDate}
              recordMarkers={dailyRecordData}
            />
          </MapWrap>
          {dailyRecordData.length !== 0 ? (
            <ListWrap>
              <ListTitle>그 날의 기록</ListTitle>
              <ListTable>
                <tr>
                  <TableHead style={{ width: '7%' }}>스토리</TableHead>
                  <TableHead style={{ width: '8%' }}>시간</TableHead>
                  <TableHead style={{ width: '18%' }}>장소</TableHead>
                  <TableHead style={{ width: '9%' }}>항목</TableHead>
                  <TableHead style={{ width: '27%' }}>내용</TableHead>
                  <TableHead style={{ width: '13%' }}>사용금액</TableHead>
                  <TableHead style={{ width: '8%' }}>삭제/수정</TableHead>
                </tr>
                {dailyRecordData.map(data => {
                  return (
                    <tr key={data._id}>
                      <TableData>
                        {data.datePhoto || data.story ? (
                          <>
                            <StoryImage
                              id={data._id}
                              alt="story"
                              src="/icon/binoculars.png"
                              onClick={e => {
                                openStory(e, data._id);
                              }}
                            />
                            <Story
                              isOpen={isStoryOpen}
                              closeStory={closeStory}
                              storyData={storyData}
                            />
                          </>
                        ) : (
                          `-`
                        )}
                      </TableData>
                      <TableData>{data.time}</TableData>
                      <TableData>{data.place ? data.place : `-`}</TableData>
                      <TableData>{data.category}</TableData>
                      <TableData>{data.expenseInfo}</TableData>
                      <TableData>{data.expense.toLocaleString()}원</TableData>
                      <TableData>
                        <DeleteButton
                          id={data._id}
                          alt="delete"
                          src="/icon/delete.png"
                          onClick={e => deleteRecord(e, data._id)}
                        />
                        <EditButton
                          id={data._id}
                          alt="edit"
                          src="/icon/edit.png"
                          onClick={e => editRecord(e, data._id)}
                        />
                        <Record
                          isOpen={isRecordEditOpen}
                          recordId={recordId}
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
                          close={cancleRecord}
                          placeName={placeName}
                          convertedDate={convertedDate}
                        />
                      </TableData>
                    </tr>
                  );
                })}
                <tr>
                  <BottomTableData colSpan="5">합계</BottomTableData>
                  <BottomTableData>
                    {totalCost.toLocaleString()}원
                  </BottomTableData>
                  <BottomTableData
                    className="allDeleteButton"
                    onClick={() => deleteAllRecord()}
                  >
                    전체삭제
                  </BottomTableData>
                </tr>
              </ListTable>
            </ListWrap>
          ) : (
            <EmptyData>
              <EmptyDataImage alt="sad face" src="/icon/sad.png" />
              <br />
              기록이 없어요
              <br />
              새로운 추억을 남겨 보세요!
            </EmptyData>
          )}
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
  padding-left: 35px;
  font-family: 'Anton', sans-serif;
  font-size: 22px;
`;

const RightWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  padding-right: 35px;
`;

const AlarmMessageWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  margin-right: 50px;
`;

const AlarmImage = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const AlarmText = styled.div`
  width: 200px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 14px;
  text-decoration: underline;
`;

const HomeButton = styled.img`
  width: 29px;
  padding-right: 10px;
  cursor: pointer;
`;

const SettingButton = styled.img`
  width: 20px;
  cursor: pointer;
`;

const BodyWrap = styled.div`
  ${flexSet('row', 'space-between')}
  padding: 0 35px;
`;

const SideWrap = styled.div`
  ${flexSet('column', 'flex-start', 'center')}
  height: 100%;
  padding: 10vh 35px 30px 0;
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
  font-size: 13px;
`;

const NickName = styled.span`
  font-weight: bold;
  color: ${props => props.theme.basicDarkGray};
`;

const NoNickName = styled.span`
  color: ${props => props.theme.basicGray};
  text-decoration: underline;
`;

const HeartIcon = styled.img`
  width: 22px;
  margin: 0 5px;
`;

const DDay = styled.div`
  margin-top: 10px;
`;

const RecordCalendar = styled.div`
  width: 230px;
  margin: 25px 0 10px 0;
`;

const RecordButton = styled.button`
  width: 230px;
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
  width: 230px;
  padding: 3px 0;
  ${buttonSet}
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10vh 0 30px 45px;
  border-left: ${props => props.theme.basicBorder};
`;

const MapWrap = styled.div`
  height: 65vh;
  margin-bottom: 60px;
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

const DeleteButton = styled.img`
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
`;

const EditButton = styled.img`
  width: 16px;
  cursor: pointer;
`;

const EmptyData = styled.div`
  min-height: 160px;
  padding-top: 20px;
  color: ${props => props.theme.basicGray};
  text-align: center;
  line-height: 150%;
  font-size: 16px;
`;

const EmptyDataImage = styled.img`
  width: 55px;
  opacity: 0.5;
`;

export default Main;
