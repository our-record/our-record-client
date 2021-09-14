import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { API } from '../../api';
import Last7Days from '../../components/Chart/Last7Days';
import Monthly from '../../components/Chart/Monthly';

const Chart = () => {
  const [data, setData] = useState([]);
  const [currentGraph, setCurrentGraph] = useState('lastweek');
  const [month, setMonth] = useState(
    `${
      new Date().getMonth() > 10
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`
    }`
  );
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getLastweekData();
  }, []);

  const getLastweekData = async () => {
    await axios({
      method: 'get',
      url: `http://${API}/chart`,
      withCredentials: true,
    }).then(res => {
      const { data } = res;
      console.log(data);
      let obj = {};

      for (let i = 0; i < data.length; i++) {
        if (!obj[data[i].date.slice(5, 10)]) {
          obj[data[i].date.slice(5, 10)] = data[i].expense;
        } else {
          obj[data[i].date.slice(5, 10)] += data[i].expense;
        }
      }
      setData(obj);
      setCurrentGraph('lastweek');
    });
  };

  const getMonthlyData = async () => {
    await axios({
      method: 'post',
      url: `http://${API}/chart/monthly`,
      data: {
        month,
        year,
      },
      withCredentials: true,
    }).then(res => {
      const { data } = res;
      let obj = {};

      for (let i = 0; i < data.length; i++) {
        if (!obj[data[i].category]) {
          obj[data[i].category] = data[i].expense;
        } else {
          obj[data[i].category] += data[i].expense;
        }
      }

      setData(obj);
      setCurrentGraph('monthly');
    });
  };

  return (
    <ChartWrapper>
      <ButtonWrapper>
        <button
          onClick={getLastweekData}
          style={
            currentGraph === 'lastweek'
              ? { fontWeight: 'bold' }
              : { fontWeight: '300' }
          }
        >
          지난7일
        </button>
        <button
          onClick={getMonthlyData}
          style={
            currentGraph === 'monthly'
              ? { fontWeight: 'bold' }
              : { fontWeight: '300' }
          }
        >
          월간
        </button>
      </ButtonWrapper>
      <section>
        {currentGraph === 'lastweek' ? (
          <Last7Days data={data} />
        ) : (
          <>
            <Monthly data={data} />
          </>
        )}
      </section>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  section {
    width: 60%;
    height: 60%;
  }
`;

const ButtonWrapper = styled.div`
  margin: 20px 0;

  button {
    all: unset;
    margin: 0 20px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
`;

export default Chart;
