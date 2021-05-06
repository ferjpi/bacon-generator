import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ data }) => {
  if (!Object.keys(data).length) return null;

  const structureData = {
    labels: [data.words.word1, data.words.word2, data.words.word3],
    datasets: [
      {
        label: "# of word",
        data: [data.words.max1, data.words.max2, data.words.max3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Bar data={structureData} height={100} width={100} options={options} />
    </>
  );
};

export default ChartComponent;
