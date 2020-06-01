import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';
import Router from '../Routes/Routes';
import {Grid} from '@material-ui/core';
import Coin from '../Coin/Coin';
import './App.css';

function App() {
  const [btcPriceUSD,setBtcPriceUSD] = useState(0);
  const [btcPriceINR,setBtcPriceINR] = useState(0);
  const [btcPriceCAD,setBtcPriceCAD] = useState(0);
  const [status,setStatus] = useState('red');
  //const [system,setSystem] = useState('cryptocompare');

  var previousPriceUSD = 0;

  async function apiCall(){
    console.log(`Current System ->>>>>> cryptocompare`)
      previousPriceUSD = btcPriceUSD;
      console.log(`Previous -> ${previousPriceUSD}`);
      const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,INR,CAD');
      const returnedUSD = response.data.USD;
      const returnedINR = response.data.INR;
      const returnedCAD = response.data.CAD;
      console.log(`New Response -> ${returnedUSD}`)
      if(returnedUSD !== btcPriceUSD){
        setBtcPriceUSD(returnedUSD);
        setBtcPriceINR(returnedINR);
        setBtcPriceCAD(returnedCAD);
        if(returnedUSD > previousPriceUSD){
          console.log('Set Green')
          setStatus('green');
        } else if (returnedUSD < previousPriceUSD){
          console.log('Set Red')
          setStatus('red');
        }
      }
  }


  useEffect(()=>{
    console.log('call 1');
    apiCall();
    const timer = setInterval(()=>{
      console.log('call 2');
        apiCall();
    },4000);
    
    return () => clearInterval(timer);
  },[btcPriceUSD]);

  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Router/>
        </Grid>
        {/*
        <Grid item xs={12}>
          <SystemSelect onChange={setSystem} system={system}/>
        </Grid>
        */}
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={3} className="coinClass">
          <Coin coin="BTC" usd={btcPriceUSD} inr={btcPriceINR} cad={btcPriceCAD} statusImg={status === 'green' ? greenTriangle:redTriangle}/>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={3} className="coinClass">
          <Coin coin="BTC" usd={btcPriceUSD} inr={btcPriceINR} cad={btcPriceCAD} statusImg={status === 'green' ? greenTriangle:redTriangle}/>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
    
    </div>
  );
}

export default App;
