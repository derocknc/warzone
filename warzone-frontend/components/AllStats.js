import BarChart from '../components/BarChart';
import { useEffect, useState, useRef } from 'react';
import "../styles/styles.scss"

export default function AllStats(props) {
  const { playerData } = props;

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
    <div className="charts">
      {charts.map((chart) => {
        const { stat, label, type } = chart;
        
        return (
          <div
            key={label}
            className="chart"
          >
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
  )
}
