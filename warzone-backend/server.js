require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const API = require('call-of-duty-api')(({platform: 'psn'}));
const port = 5500;

app.use(cors());

app.use(function(req, res, next)
{ res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); 
next(); 
});


API.login(process.env.COD_EMAIL, process.env.COD_PW).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

const players = ['d_stutts', 'parky914', 'waking1987', 'burly1984', 'muskrat_mitch', 'robearpig'];

// const getAllPlayerStats = () => {
//   players.forEach()
// }

// app.get('/', (req, res) => {
//   API.MWBattleData('d_stutts').then(data => {
//     res.send(data);
//   }).catch(err => {
//     console.log('why broken');
//       console.log(err);
//   });
// });

const getPlayerStats = (player) => {
  return API.MWBattleData(player).then(data => {
    return {
      ...data,
      playerName: player
    };
  }).catch(err => {
      console.log(err);
  });
}

// API.MWBattleData('d_stutts').then(data => {
//   console.log('player data', data);
//   return data
// }).catch(err => {
//   console.log('why broken');
//     console.log(err);
// });

app.get('/', (req, res) => {
  const results = Promise.all(players.map(getPlayerStats));
  console.log('results', results);
  results.then((data) => {
    console.log('daaata', data);
    res.send(data);
  })
});



// route for playstation users
// app.get('/psn/:gtag', (req, res) => {
//     let obj = {}
//     COD_PSN.MWstats(req.params.gtag, COD_PSN.platforms.psn)
//         .then(output => obj['1'] = output)
//         .then(axios.get(`https://public-api.tracker.gg/apex/v1/standard/profile/2/${req.params.gtag}`, {headers: {'TRN-Api-Key': `${config.apiKey}`}})
//                 .then(output => obj['2'] = output.data)
//                 .then(() => res.send(obj))
//                 .catch(err => console.log(err)))
//         .catch(err => console.log(err))
// })


app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});