import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Record from '../../components/Record/Record';
import Story from '../../components/Story/Story';
import SearchPlaceInput from '../../components/Main/Map/SearchPlaceInput';
import Nav from '../../components/Nav/Nav';
import Loading from '../../components/Common/Loading';
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
import { COST_CATEGORY } from '../../config';
import { removeRecord, removeAllRecord } from '../../api';
import { Link } from 'react-router-dom';
import { getUsersInfo } from '../../modules/users';
import { getRecords, deleteAllRecords } from '../../modules/records';
import { getRecordDetail } from '../../modules/recordForm';

const Main = () => {
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [recordId, setRecordId] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState(new Date());
  const [placeName, setPlaceName] = useState('');
  const [searchTerm, setSearchTerm] = useState();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyData, setStoryData] = useState();
  const [dDay, setDDay] = useState();

  const { usersData, usersLoading, usersError } = useSelector(
    state => state.users
  );
  const { recordsData, recordsLoading, recordsError } = useSelector(
    state => state.records
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const year = calendarDate.getFullYear();
    const month = `0${calendarDate.getMonth() + 1}`.slice(-2);
    const date = `0${calendarDate.getDate()}`.slice(-2);
    setConvertedDate(`${year}-${month}-${date}`);
    dispatch(getUsersInfo());
    dispatch(getRecords(convertedDate));
    setSearchTerm('');
  }, [calendarDate, convertedDate]);

  useEffect(() => {
    calcDday(usersData.dday);
  }, [usersData]);

  useEffect(() => {
    calculateTotalCost(recordsData);
  }, [recordsData]);

  const calcDday = dday => {
    const coupleDate = new Date(dday);
    const today = new Date();
    const calcDate = today.getTime() - coupleDate.getTime();
    setDDay(Math.floor(calcDate / (1000 * 60 * 60 * 24)) - 1);
  };

  const calculateTotalCost = data => {
    if (data.length === 1) {
      setTotalCost(data[0].expense);
    } else {
      const sumResult = data.reduce((pre, crr) => pre + crr.expense, 0);
      setTotalCost(sumResult);
    }
  };

  const deleteRecord = id => {
    if (window.confirm('기록을 삭제하시겠습니까?')) {
      removeRecord(convertedDate, id);
      dispatch(getRecords(convertedDate));
    }
  };

  const deleteAllRecord = () => {
    if (window.confirm('기록 전체를 삭제하시겠습니까?')) {
      removeAllRecord(convertedDate);
      dispatch(deleteAllRecords());
    }
  };

  const openStory = event => {
    setStoryData(recordsData.filter(data => data._id === event.target.id));
    setIsStoryOpen(true);
  };

  const closeStory = () => {
    setIsStoryOpen(false);
  };

  const editRecordOpen = event => {
    if (window.confirm('기록을 수정하시겠습니까?')) {
      setRecordId(event.target.id);
      dispatch(getRecordDetail(event.target.id));
      setIsRecordOpen(true);
    }
  };

  if (usersError || recordsError) {
    return <div>Error: {usersError || recordsError}</div>;
  }

  return (
    <>
      {usersLoading && recordsLoading ? (
        <Loading />
      ) : (
        <MainWrap>
          <Nav />
          <BodyWrap>
            <SideWrap>
              <ProfileImage
                alt="profile"
                src={`${
                  usersData && usersData.couple_img
                    ? usersData.couple_img
                    : '/icon/couple.png'
                }`}
              />
              <NickNameWrap>
                {usersData && usersData.invitor_nickname ? (
                  <NickName>{usersData.invitor_nickname}</NickName>
                ) : (
                  <NoNickName> 등록해 주세요</NoNickName>
                )}
                <HeartIcon alt="heart" src="/icon/heart.png" />{' '}
                {usersData && usersData.invitee_nickname ? (
                  <NickName>{usersData.invitee_nickname}</NickName>
                ) : (
                  <NoNickName> 등록해 주세요</NoNickName>
                )}
              </NickNameWrap>
              <DDay>{usersData && usersData.dday ? `D + ${dDay}일` : ''}</DDay>
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
                setIsRecordOpen={setIsRecordOpen}
                placeName={placeName}
                setPlaceName={setPlaceName}
                convertedDate={convertedDate}
                lat={lat}
                long={long}
                setSearchTerm={setSearchTerm}
                setLat={setLat}
                setLong={setLong}
              />
              <Link to="/chart">
                <StatisticsButton>이 달의 통계</StatisticsButton>
              </Link>
            </SideWrap>
            <ContentsWrap>
              <MapWrap>
                <SearchPlaceInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setPlaceName={setPlaceName}
                  setLong={setLong}
                  setLat={setLat}
                  recordMarkers={recordsData}
                />
              </MapWrap>
              {recordsData.length !== 0 ? (
                <ListWrap>
                  <ListTitle>그 날의 기록</ListTitle>
                  <ListTable>
                    <thead>
                      <tr>
                        <TableHead style={{ width: '7%' }}>스토리</TableHead>
                        <TableHead style={{ width: '8%' }}>시간</TableHead>
                        <TableHead style={{ width: '18%' }}>장소</TableHead>
                        <TableHead style={{ width: '9%' }}>항목</TableHead>
                        <TableHead style={{ width: '27%' }}>내용</TableHead>
                        <TableHead style={{ width: '13%' }}>사용금액</TableHead>
                        <TableHead style={{ width: '8%' }}>삭제/수정</TableHead>
                      </tr>
                    </thead>
                    <tbody>
                      {recordsData.map(data => {
                        return (
                          <tr key={data._id}>
                            <TableData>
                              {data.datePhoto && data.story ? (
                                <>
                                  <StoryImage
                                    id={data._id}
                                    alt="story"
                                    src="/icon/binoculars.png"
                                    onClick={e => {
                                      openStory(e);
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
                            <TableData>
                              {data.place ? data.place : `-`}
                            </TableData>
                            <TableData>
                              {COST_CATEGORY[data.category]}
                            </TableData>
                            <TableData>{data.expenseInfo}</TableData>
                            <TableData>
                              {data.expense.toLocaleString()}원
                            </TableData>
                            <TableData>
                              <DeleteButton
                                id={data._id}
                                alt="delete"
                                src="/icon/delete.png"
                                onClick={() => deleteRecord(data._id)}
                              />
                              <EditButton
                                id={data._id}
                                alt="edit"
                                src="/icon/edit.png"
                                onClick={e => editRecordOpen(e)}
                              />
                              <Record
                                isOpen={isRecordOpen}
                                setIsRecordOpen={setIsRecordOpen}
                                recordId={recordId}
                                setRecordId={setRecordId}
                                lat={lat}
                                long={long}
                                placeName={placeName}
                                setPlaceName={setPlaceName}
                                convertedDate={convertedDate}
                                setSearchTerm={setSearchTerm}
                                setLat={setLat}
                                setLong={setLong}
                              />
                            </TableData>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <BottomTableData colSpan="5">합계</BottomTableData>
                        <BottomTableData>
                          {Number(totalCost).toLocaleString()}원
                        </BottomTableData>
                        <BottomTableData
                          className="allDeleteButton"
                          onClick={() => deleteAllRecord()}
                        >
                          전체삭제
                        </BottomTableData>
                      </tr>
                    </tfoot>
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
        </MainWrap>
      )}
    </>
  );
};

const MainWrap = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
  font-size: 0.7rem;
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
