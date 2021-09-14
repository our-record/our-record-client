import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 5000, // 스케일에 대한 사용자 고정 정의 값
        },
      },
    ],
  },
  maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
};

const getLast7Days = () => {
  return '0123456'.split('').map(function (n) {
    var d = new Date();
    d.setDate(d.getDate() - n);

    return (function (day, month) {
      return [
        month < 10 ? '0' + month : month,
        day < 10 ? '0' + day : day,
      ].join('-');
    })(d.getDate(), d.getMonth() + 1);
  });
};

const Last7Days = props => {
  const { data } = props;
  const days = getLast7Days();
  let chartObj = {};

  days.map(data => {
    chartObj[data] = 0;
  });

  for (const [key, value] of Object.entries(data)) {
    chartObj[key] = value;
  }

  const expense = Object.values(chartObj).reverse();
  const chartData = {
    labels: days.reverse(),
    datasets: [
      {
        label: '',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(84, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 159, 64, 1)',
        ],
        borderWidth: 1,
        data: expense,
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};

export default Last7Days;
