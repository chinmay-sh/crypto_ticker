import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';
import Routes from '../Routes/Routes';
import {Grid} from '@material-ui/core';
import Coin from '../Coin/Coin';
import './App.css';
import LoadingOverlay from 'react-loading-overlay';

function App() {

  const [coinList,setCoinList] = useState('');

  const [previousPriceList,setPreviousPriceList] = useState([]);

  const [coinDataArray,setCoinDataArray] = useState([]);

  const [spinnerActive,setSpinnerActive] = useState(true);

  const[statusArray,setStatusArray] = useState([]);

  async function coinListPopulator(){
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://chasing-coins.com/api/v1/top-coins/20');
    //console.log(Object.values(response.data))
    var list = []
    var coinliststring = ''
    for(var i=0;i<Object.values(response.data).length;i++){
      //console.log(Object.values(response.data)[i].symbol)
      if(i === Object.values(response.data).length-1){
        coinliststring += `${Object.values(response.data)[i].symbol}`
      } else{
        coinliststring += `${Object.values(response.data)[i].symbol},`
      }
      //list.push({"coin":`${Object.values(response.data)[i].symbol}`,"previousPriceUSD":Object.values(response.data)[i].price})
      list.push(Object.values(response.data)[i].price)
    }

    setPreviousPriceList(list);
    setCoinList(coinliststring);
  }

  async function apiCallWOutPrevList(){

  }

  async function apiCall(){
    //set previous price of coins for comparison later
    //console.log(coinList)
    var prevPricelist = []
    for(var i=0;i<previousPriceList.length;i++){
      //prevPricelist.push({"coin":`${Object.values(coinDataArray)[i].coin}`,"previousPriceUSD":Object.values(coinDataArray)[i].priceUSD})
      prevPricelist.push(Object.values(coinDataArray)[i].priceUSD)
    }
    setPreviousPriceList(prevPricelist);
    console.log(previousPriceList)
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD,INR,CAD`);
    //console.log(response.data);

    var coinDataTempList = []
    var coinStatusTempList=[]
    for(var i=0;i<Object.keys(response.data).length;i++){
      coinDataTempList.push({"coin":`${Object.keys(response.data)[i]}`,"priceUSD":Object.values(response.data)[i].USD,"priceINR":Object.values(response.data)[i].INR,"priceCAD":Object.values(response.data)[i].CAD})
    
      var returnedUSD = Object.values(response.data)[i].USD;

      
      /*
      var previousPriceUSD = Object.values(previousPriceList)[i].previousPriceUSD;
      if(returnedUSD !== previousPriceUSD){
        if(returnedUSD > previousPriceUSD){
          coinStatusTempList.push('green')
        } else if (returnedUSD < previousPriceUSD){
          coinStatusTempList.push('red')
        }
      }
      */
    }

    //setStatusArray(coinStatusTempList);
    
    
    setCoinDataArray(coinDataTempList);
    

     
  }


  useEffect(()=>{
    coinListPopulator();
    apiCall();
    const time = setInterval(()=>{
      setSpinnerActive(false);
    },10000);

    return ()=> clearInterval(time);
  },[]);

  useEffect(()=>{   
    const timer = setInterval(()=>{
      console.log('call 2');
        apiCall();
    },5000);
    
    return () => clearInterval(timer);
    
  },[coinDataArray]);

  var gridList = [];
  for (var i=0;i<coinDataArray.length-1;i+=2){
    gridList.push(
      <div key={`coin_${i}`}>
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Coin coin={coinDataArray[i].coin} usd={coinDataArray[i].priceUSD} inr={coinDataArray[i].priceINR} cad={coinDataArray[i].priceCAD} statusImg={greenTriangle} /> {/* statusImg={status === 'green' ? greenTriangle:redTriangle}*/}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Coin coin={coinDataArray[i+1].coin} usd={coinDataArray[i+1].priceUSD} inr={coinDataArray[i+1].priceINR} cad={coinDataArray[i+1].priceCAD} statusImg={greenTriangle} /> {/* statusImg={status === 'green' ? greenTriangle:redTriangle}*/}
        </Grid>
        <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
  
  return (
    <LoadingOverlay
      active={spinnerActive}
      spinner
      fadeSpeed={500}
      text='Loading coins...'
      >
    <div>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Routes/>
        </Grid>
        <Grid item xs={12}>
        {gridList}
        </Grid>
      </Grid>

    </div>

    </LoadingOverlay>
  );
}

export default App;