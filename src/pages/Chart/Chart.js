import react, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { API } from '../../api';
import Last7Days from '../../components/Chart/Last7Days';
import Monthly from '../../components/Chart/Monthly';

const Chart = () => {
  const [data, setData] = useState([]);
  const [currentGraph, setCurrentGraph] = useState('lastweek');

  useEffect(() => {
    const getData = async () => {
      await axios({
        method: 'get',
        url: `http://${API}/chart`,
        withCredentials: true,
      }).then(res => {
        const { data } = res;
        let obj = {};

        for (let i = 0; i < data.length; i++) {
          if (!obj[data[i].date.slice(5, 10)]) {
            obj[data[i].date.slice(5, 10)] = data[i].expense;
          } else {
            obj[data[i].date.slice(5, 10)] += data[i].expense;
          }
        }

        // data.map(data => {
        //   const date = data.date.slice(5, 10);
        //   if (!obj[date]) {
        //     obj[date] = {
        //       expense: data.expense,
        //     };
        //   } else {
        //     obj[date] = {
        //       expense: data.expense,
        //     };
        //   }
        // });

        setData(obj);
      });
    };
    getData();
  }, []);

  return (
    <ChartWrapper>
      <section>
        {currentGraph === 'lastweek' ? <Last7Days data={data} /> : <Monthly />}
      </section>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    width: 50%;
    height: 50%;
  }
`;

export default Chart;
