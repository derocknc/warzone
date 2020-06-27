import Head from 'next/head';
import axios from 'axios';
import Chart from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import BarChart from '../components/BarChart';
import "../styles/styles.scss"

export default function Home() {

const [playerData, setPlayerData] = useState(null);

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

const charts = [
  { 
    label: 'Wins',
    type: 'bar',
    stat: 'wins'
  },
  { 
    label: 'Kill / Death Ratio',
    type: 'bar',
    stat: 'kdRatio'
  },
  { 
    label: 'Games Played',
    type: 'bar',
    stat: 'gamesPlayed'
  },
  { 
    label: 'Revives',
    type: 'bar',
    stat: 'revives'
  },
  { 
    label: 'Score Per Minute',
    type: 'bar',
    stat: 'scorePerMinute'
  }
];

  return (
    <div className="container">
      <div className="charts">
        {charts.map((chart) => {
          const { stat, label, type } = chart;
          return (
            <div className="chart">
              <BarChart
                label={label}
                statType={stat}
                playerData={playerData}
                type={type}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
