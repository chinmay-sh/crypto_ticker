import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';
import Routes from '../Routes/Routes';
import {Grid} from '@material-ui/core';
import Coin from '../Coin/Coin';
import './App.css';

function App() {

  var coinList = 'BTC,ETH';

  var previousPriceList = ([
    {"coin":"BTC","previousPriceUSD":0},
    {"coin":"ETH","previousPriceUSD":0},
  ]);

  const [coinDataArray,setCoinDataArray] = useState([
    {"coin":"BTC","priceUSD":10,"priceINR":10,"priceCAD":10}, // TODO: add status green/red to object
    {"coin":"ETH","priceUSD":20,"priceINR":20,"priceCAD":20}
  ]);


  async function coinListPopulator(){
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://chasing-coins.com/api/v1/top-coins/20');
    console.log(Object.values(response.data))
    var list = []
    for(var i=0;i<Object.values(response.data).length;i++){
      console.log(Object.values(response.data)[i].symbol)
      list.push({"coin":`${Object.values(response.data)[i].symbol}`,"previousPriceUSD":Object.values(response.data)[i].price})
    }
    console.log(list)
    //setCoinList(list)
  }

  async function apiCall(){
    //set previous price of coins for comparison later
    //console.log(previousPriceList);
    var prevPricelist = []
    for(var i=0;i<previousPriceList.length;i++){
      //console.log(`Coin: ${Object.values(coinList)[i].coin}, Prev: ${Object.values(coinList)[i].previousPriceUSD}`)
      prevPricelist.push({"coin":`${Object.values(coinDataArray)[i].coin}`,"previousPriceUSD":Object.values(coinDataArray)[i].priceUSD})
    }
    //console.log(prevPricelist)
    previousPriceList = prevPricelist;
    
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD,INR,CAD`);
    //console.log(response.data);

    var coinDataTempList = []
    for(var i=0;i<Object.keys(response.data).length;i++){
      //console.log(Object.keys(response.data)[i])
      //console.log(Object.values(response.data)[i])
      coinDataTempList.push({"coin":`${Object.keys(response.data)[i]}`,"priceUSD":Object.values(response.data)[i].USD,"priceINR":Object.values(response.data)[i].INR,"priceCAD":Object.values(response.data)[i].CAD})
    }
    setCoinDataArray(coinDataTempList);
    //console.log(coinDataArray[0]);

      /*
      if(returnedUSD !== btcPriceUSD){

        if(returnedUSD > previousPriceUSD){
          console.log('Set Green')
          setStatus('green');
        } else if (returnedUSD < previousPriceUSD){
          console.log('Set Red')
          setStatus('red');
        }
      }
      */
  }

/*
  useEffect(()=>{
    coinListPopulator();
  },[]);
*/
  useEffect(()=>{   
    const timer = setInterval(()=>{
      console.log('call 2');
        apiCall();
    },5000);
    
    return () => clearInterval(timer);
    
  },[coinDataArray]);
/*
  useEffect(()=>{
    console.log('call 1');
    apiCall();
  },[]);
*/
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Routes/>
        </Grid>
        
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={3} className="coinClass">
          <Coin coin={coinDataArray[0].coin} usd={coinDataArray[0].priceUSD} inr={coinDataArray[0].priceINR} cad={coinDataArray[0].priceCAD} statusImg={greenTriangle} /> {/* statusImg={status === 'green' ? greenTriangle:redTriangle}*/}
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={3} className="coinClass">
          <Coin coin={coinDataArray[1].coin} usd={coinDataArray[1].priceUSD} inr={coinDataArray[1].priceINR} cad={coinDataArray[1].priceCAD} statusImg={redTriangle}/>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
        
    </div>
  );
}

export default App;
