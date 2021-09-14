import React from 'react';
import { Pie } from 'react-chartjs-2';

const Monthly = props => {
  const CATEGORY = ['1', '2', '3', '4'];
  const LABELS = ['식비', '교통비', '문화비', '기타'];
  const { data } = props;

  let chartObj = {};

  console.log(data);

  for (const [k, v] of Object.entries(data)) {
    chartObj[LABELS[k - 1]] = v;
  }

  const expense = Object.values(chartObj);
  console.log(expense);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  };

  const chartData = {
    labels: LABELS,
    datasets: [
      {
        data: expense,

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 88, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(0, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={chartData} options={options} />;
};

export default Monthly;
