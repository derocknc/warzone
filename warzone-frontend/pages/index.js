import Head from 'next/head';
import axios from 'axios';
import Chart from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import "../styles/styles.scss"

export default function Home() {

const [playerData, setPlayerData] = useState(null);

const getNames = () => {
  return playerData.map(player => player.playerName);
}

const getWins = () => {
  return playerData.map(player => player.br.wins);
}

const getKd = () => {
  return playerData.map(player => player.br.kdRatio);
}

const getGamesPlayed = () => {
  return playerData.map(player => player.br.gamesPlayed);
}

const getRevives = () => {
  return playerData.map(player => player.br.revives);
}

const getScorePerMinute = () => {
  return playerData.map(player => player.br.scorePerMinute);
}

useEffect(() => {
  if (!playerData) {
    axios.get('http://localhost:5500/')
    .then((response) => {
      setPlayerData(response.data);
    }).catch((err) => {
      console.log('error fetching player data', err);
    })
  }
}, []);


const winChartRef = useRef(null);
const kdChartRef = useRef(null);
const gamesPlayedChartRef = useRef(null);
const revivesChartRef = useRef(null);
const SPMChartRef = useRef(null);

useEffect(() => {
  const myWinChartRef = winChartRef.current.getContext("2d");
  const myKdChartRef = kdChartRef.current.getContext("2d");
  const myGamesPlayedChartRef = gamesPlayedChartRef.current.getContext("2d");
  const myRevivesChartRef = revivesChartRef.current.getContext("2d");
  const mySPMChartRef = revivesChartRef.current.getContext("2d");

  const { height: graphHeight } = myWinChartRef.canvas;

  let gradientLine = myWinChartRef
    .createLinearGradient(0, 0, 0, graphHeight);
      gradientLine.addColorStop(0, "rgb(75, 255, 30, 1.0)");
      gradientLine.addColorStop(0.5, "rgb(75, 255, 30, 0.15)");
      gradientLine.addColorStop(1, "rgb(75, 255, 30, 0.05)");

  if (playerData) {
    new Chart(myWinChartRef, {
      type: 'line',
      data: {
        labels: getNames(),
        datasets: [
          {
            label: 'Wins',
            data: getWins(),
            backgroundColor: gradientLine
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
              }
          }]
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        legend: {
          labels: {
            fontColor: '#ffffff',
            boxWidth: 0
          }
        }
      }
    });
    new Chart(myKdChartRef, {
      type: 'line',
      data: {
        labels: getNames(),
        datasets: [
          {
            label: 'Kill / Death Ratio',
            data: getKd(),
            backgroundColor: gradientLine
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: '#fff'
              }
          }],
          yAxes: [{
              gridLines: {
                  display: false,
              }
          }]
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        legend: {
          labels: {
            fontColor: '#ffffff',
            boxWidth: 0
          }
        }
      }
    });
    new Chart(myGamesPlayedChartRef, {
      type: 'line',
      data: {
        labels: getNames(),
        datasets: [
          {
            label: 'Games Played',
            data: getGamesPlayed(),
            backgroundColor: gradientLine
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
              }
          }]
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        legend: {
          labels: {
            fontColor: '#ffffff',
            boxWidth: 0
          }
        }
      }
    });
    new Chart(myRevivesChartRef, {
      type: 'line',
      data: {
        labels: getNames(),
        datasets: [
          {
            label: 'Revives',
            data: getRevives(),
            backgroundColor: gradientLine
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
              }
          }]
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        legend: {
          labels: {
            fontColor: '#ffffff',
            boxWidth: 0
          }
        }
      }
    });
    new Chart(mySPMChartRef, {
      type: 'line',
      data: {
        labels: getNames(),
        datasets: [
          {
            label: 'Score Per Minute',
            data: getScorePerMinute(),
            backgroundColor: gradientLine
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
              }
          }]
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
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
}, [playerData]);

// console.log(playerData);

  return (
    <div className="container">
        {/* <h1>Warzone</h1>
      {playerData && (
        playerData.map((player) => {
        return (
          <h3 key={player.playerName}>{player.playerName}</h3>
        )
      }))} */}
      <div className="charts">
        <canvas
          id='winChart'
          ref={winChartRef}
        />
        <canvas
          id='kdChart'
          ref={kdChartRef}
        />
        <canvas
          id='gamesPlayedChart'
          ref={gamesPlayedChartRef}
        />
        <canvas
          id='revivesChart'
          ref={revivesChartRef}
        />
        <canvas
          id='scorePerMinuteChart'
          ref={SPMChartRef}
        />
      </div>
    </div>
  )
}
