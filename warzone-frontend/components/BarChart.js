import Chart from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import "../styles/styles.scss"

export default function BarChart(props) {

const { playerData, statType, type, label } = props;

const getNames = () => {
  return playerData.map(player => player.playerName);
}

const chartRef = useRef(null);

const getData = (statType) => {
  return playerData.map(player => player.br[statType]);
}

useEffect(() => {
  const chartEl = chartRef.current.getContext("2d");

  const { height: graphHeight } = chartEl.canvas;

  let gradientLine = chartEl
    .createLinearGradient(0, 0, 0, graphHeight);
      gradientLine.addColorStop(0, "rgb(75, 255, 30, 1.0)");
      gradientLine.addColorStop(0.25, "rgb(75, 255, 30, 0.25)");
      gradientLine.addColorStop(1, "rgb(75, 255, 30, 0.05)");

  if (playerData) {
    new Chart(chartEl, {
      type: type,
      data: {
        labels: getNames(),
        datasets: [
          {
            label: label,
            data: getData(statType),
            backgroundColor: gradientLine,
            borderColor: 'rgb(75, 255, 30, 1.0)',
            borderWidth: '1',
            hoverBorderWidth: '2',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
              gridLines: {
                  display: false,
              }
          }],
          yAxes: [{
              gridLines: {
                  display: false,
              },
              ticks: {
                min: 0
              }
          }]
        },
        legend: {
          labels: {
            fontColor: '#ffffff',
            boxWidth: 0
          }
        }
      }
    });
  }
}, [playerData, statType]);

  return (
    <canvas
      id={statType}
      ref={chartRef}
    />
  )
}
