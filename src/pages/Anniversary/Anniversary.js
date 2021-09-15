import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Loading from '../../components/Common/Loading';
import styled from 'styled-components';
import {
  tableSet,
  tableHeadSet,
  tableDataSet,
  flexSet,
} from '../../styles/mixin';
import { removeEvent, editEvent, postEvent } from '../../api';
import { API } from '../../api';

const Anniversary = () => {
  const [minimumDate, setMinimumDate] = useState();
  const [coupleInfo, setCoupleInfo] = useState();
  const [invitorBirth, setInvitorBirth] = useState();
  const [inviteeBirth, setInviteeBirth] = useState();
  const [dDay, setDDay] = useState();
  const [dDayCount, setDDayCount] = useState();
  const [eventData, setEventData] = useState();
  const [anniversary, setAnniversary] = useState('');
  const [date, setDate] = useState('');
  const [eventId, setEventId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const date = `0${today.getDate()}`.slice(-2);
    setMinimumDate(`${year}-${month}-${date}`);

    axios({
      url: `http://${API}/user/register-info`,
      withCredentials: true,
    }).then(res => {
      setCoupleInfo(res.data);
      calcDefaultEvent(res.data);
    });

    getUserEvent();
  }, []);

  const getUserEvent = () => {
    axios({
      url: `http://${API}/anniversary`,
      withCredentials: true,
    }).then(res => {
      setEventData(res.data);
      setIsLoading(false);
    });
  };

  const calcDefaultEvent = data => {
    data.invitor_birth && getEventTable(data.invitor_birth, setInvitorBirth);
    data.invitee_birth && getEventTable(data.invitee_birth, setInviteeBirth);
    data.dday && getEventTable(data.dday, setDDay);
    data.dday && getEventTable(data.dday, setDDayCount);
  };

  const getEventTable = (event, func) => {
    const today = new Date();
    const eventDate = new Date(event);
    const age = today.getFullYear() - eventDate.getFullYear();
    const calcAge =
      Math.floor(today.getTime() - eventDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365);

    const year = today.getFullYear();
    const month = `0${eventDate.getMonth() + 1}`.slice(-2);
    const date = `0${eventDate.getDate()}`.slice(-2);

    func === setDDayCount
      ? func(Math.floor(calcAge + 1))
      : func(`${calcAge < age ? year : year + 1}-${month}-${date}`);
  };

  const submitEvent = async () => {
    const validation = anniversary && date;

    if (!validation) {
      alert('정보를 정확히 입력해 주세요.');
    } else {
      const fetchData = {};
      isEdit && (fetchData._id = eventId);
      fetchData.eventName = anniversary;
      fetchData.date = date;

      if (window.confirm(`기념일을 ${isEdit ? '수정' : '등록'}하시겠습니까?`)) {
        try {
          isEdit ? await editEvent(fetchData) : await postEvent(fetchData);
          setAnniversary('');
          setDate('');
          setEventId('');
          setIsEdit(false);
          getUserEvent();
        } catch (e) {
          console.log(e);
        }
      }
    }

    // const fetchData = {};
    // isEdit && (fetchData._id = eventId);
    // fetchData.eventName = anniversary;
    // fetchData.date = date;

    // if (window.confirm(`기념일을 ${isEdit ? '수정' : '등록'}하시겠습니까?`)) {
    //   await axios({
    //     url: `http://${API}/anniversary/${isEdit ? 'edit' : 'write'}`,
    //     method: 'post',
    //     data: fetchData,
    //     withCredentials: true,
    //   }).then(
    //     setAnniversary(''),
    //     setDate(''),
    //     setEventId(''),
    //     setIsEdit(false)
    //   );
    // }
    // getUserEvent();
  };

  const deleteEvent = async event => {
    if (window.confirm('기념일을 삭제하시겠습니까?')) {
      try {
        await removeEvent(event.target.id);
      } catch (e) {
        console.log(e);
      } finally {
        getUserEvent();
        alert('삭제되었습니다.');
      }
    }
  };

  const editEventSet = event => {
    const selected = eventData.filter(data => data._id === event.target.id);
    setIsEdit(true);
    setEventId(selected[0]._id);
    setAnniversary(selected[0].eventName);
    setDate(selected[0].date.slice(0, 10));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Nav coupleData={coupleInfo} />
          <AnniversaryWrap>
            <ContentsWrap>
              <MainTitle>기억하고 싶은 기념일을 등록해 주세요</MainTitle>
              <AnniversaryTable>
                <thead>
                  <tr>
                    <TableHead style={{ width: '40%' }}>기념일</TableHead>
                    <TableHead style={{ width: '40%' }}>날짜</TableHead>
                    <TableHead style={{ width: '20%' }}>삭제/수정</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {invitorBirth && (
                    <tr>
                      <DefaultEvent>
                        {coupleInfo.invitor_nickname
                          ? coupleInfo.invitor_nickname
                          : '사용자1'}{' '}
                        생일
                      </DefaultEvent>
                      <DefaultEvent>{invitorBirth}</DefaultEvent>
                      <DefaultEvent></DefaultEvent>
                    </tr>
                  )}
                  {inviteeBirth && (
                    <tr>
                      <DefaultEvent>
                        {coupleInfo.invitee_nickname
                          ? coupleInfo.invitee_nickname
                          : '사용자2'}{' '}
                        생일
                      </DefaultEvent>
                      <DefaultEvent>{inviteeBirth}</DefaultEvent>
                      <DefaultEvent></DefaultEvent>
                    </tr>
                  )}
                  {dDay && (
                    <tr>
                      <DefaultEvent>{dDayCount}주년</DefaultEvent>
                      <DefaultEvent>{dDay}</DefaultEvent>
                      <DefaultEvent></DefaultEvent>
                    </tr>
                  )}
                  {eventData &&
                    eventData.map(data => {
                      return (
                        <TableRow key={data._id}>
                          <TableData>{data.eventName}</TableData>
                          <TableData>{data.date.slice(0, 10)}</TableData>
                          <TableData>
                            {' '}
                            <DeleteImage
                              id={data._id}
                              alt="delete"
                              src="/icon/delete.png"
                              onClick={e => deleteEvent(e)}
                            />
                            <EditImage
                              id={data._id}
                              alt="edit"
                              src="/icon/edit.png"
                              onClick={e => editEventSet(e)}
                            />
                          </TableData>
                        </TableRow>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <TableData>
                      <AnniversaryInput
                        type="text"
                        value={anniversary}
                        placeholder="기념일을 작성해주세요"
                        onChange={event => setAnniversary(event.target.value)}
                      />
                    </TableData>
                    <TableData>
                      <DateInput
                        type="date"
                        value={date}
                        min={minimumDate}
                        onChange={event => setDate(event.target.value)}
                      />
                    </TableData>
                    <TableData>
                      {' '}
                      <EnrollButton onClick={submitEvent}>
                        {isEdit ? '수정' : '등록'}
                      </EnrollButton>
                    </TableData>
                  </tr>
                </tfoot>
              </AnniversaryTable>
            </ContentsWrap>
          </AnniversaryWrap>
        </>
      )}
    </>
  );
};

const AnniversaryWrap = styled.div`
  ${flexSet('column', 'flex-start', 'center')}
  height: 100vh;
  padding: 70px 0;
`;

const ContentsWrap = styled.div``;
const MainTitle = styled.div`
  margin-bottom: 40px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const AnniversaryTable = styled.table`
  ${tableSet('600px')}
`;
const TableHead = styled.th`
  ${tableHeadSet};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

const DefaultEvent = styled.td`
  ${tableDataSet};
  border: none;
  background-color: #fff7f2;
`;

const TableData = styled.td`
  ${tableDataSet};
  border-right: none;
  border-left: none;
  border-bottom: none;
`;

const DeleteImage = styled.img`
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
  opacity: 0.8;
`;

const EditImage = styled.img`
  width: 16px;
  cursor: pointer;
  opacity: 0.8;
`;

const AnniversaryInput = styled.input`
  height: 18px;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicDarkGray};
  font-size: 12px;

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.basicGray};
    vertical-align: middle;
    font-size: 12px;
  }
`;

const DateInput = styled.input`
  width: 120px;
  height: 18px;
  appearance: none;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicGray};
  font-size: 12px;

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
  }
`;

const EnrollButton = styled.button`
  padding: 1px 12px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 3px;
  color: ${props => props.theme.basicDarkGray};
  background-color: white;
  font-size: 10px;
  box-shadow: 1px 1px rgb(200, 200, 200);
  cursor: pointer;
`;

export default Anniversary;
