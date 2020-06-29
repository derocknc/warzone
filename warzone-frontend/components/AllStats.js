import BarChart from '../components/BarChart';
import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

  const [currentStat, setCurrentStat] = useState(charts[0]);

  const handleChange = (event) => {
    setCurrentStat(charts.find(chart => chart.stat === event.target.value));
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentStat.stat}
          onChange={handleChange}
        >
        {charts.map((chart) => {
          const { stat, label } = chart;

          return (
            <MenuItem
              value={chart.stat}
            >
              {chart.label}
            </MenuItem>
          )
        })}
        </Select>
      </FormControl>
      <div className="charts">
        <BarChart
          label={currentStat.label}
          statType={currentStat.stat}
          playerData={playerData}
          type={currentStat.type}
        />
      </div>
    </div>
  )
}
