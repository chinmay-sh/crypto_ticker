import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';
import Routes from '../Routes/Routes';
import {Grid} from '@material-ui/core';
import Coin from '../Coin/Coin';
import './App.css';
import LoadingScreen from 'react-loading-screen';
import logo from '../../logo.svg';

function App() {

  const [coinList,setCoinList] = useState('');

  //const [previousPriceList,setPreviousPriceList] = useState([]);

  const [coinImgList,setcoinImgList] = useState([]);

  const [coinDataArray,setCoinDataArray] = useState([]);

  const [spinnerActive,setSpinnerActive] = useState(true);

  const[statusArray,setStatusArray] = useState([]);

  async function coinListPopulator(){
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD');
    //var listprev = []
    // console.log(`Coin List: ${(response.data.Data[0]).CoinInfo.Name}`)
    var coinliststring = '';
    var coinImg = []
    var listCoinPreset = []
    for(var i=0;i<Object.values(response.data.Data).length;i++){

      console.log(`Coin ${i}: ${(response.data.Data[i]).CoinInfo.Name}`)

      if(i === 0){
        coinliststring += `${Object.values(response.data.Data)[i].CoinInfo.Name}`
      } else{
        coinliststring += `,${Object.values(response.data.Data)[i].CoinInfo.Name}`
      }
      //listprev.push({"coin":`${Object.values(response.data)[3][i].CoinInfo.Name}`,"previousPriceUSD":0})
      listCoinPreset.push({"coin":`${Object.values(response.data.Data)[i].CoinInfo.Name}`,"priceUSD":0,"priceINR":0,"priceCAD":0})

      coinImg.push(Object.values(response.data.Data)[i].CoinInfo.ImageUrl)
    }

    //setPreviousPriceList(listprev);
    setCoinList(coinliststring);
    setcoinImgList(coinImg);
    setCoinDataArray(listCoinPreset);
  }
  
  async function apiCall(){
    //set previous price of coins for comparison later


    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD,INR,CAD`);
    //console.log(response.data);

    var coinDataTempList = []
    var coinStatusTempList=[]
    for(var i=0;i<Object.keys(response.data).length;i++){
      coinDataTempList.push({"coin":`${Object.keys(response.data)[i]}`,"priceUSD":Object.values(response.data)[i].USD,"priceINR":Object.values(response.data)[i].INR,"priceCAD":Object.values(response.data)[i].CAD})
    
      var returnedUSD = Object.values(response.data)[i].USD;
      
      if(coinDataArray.length === 20){
        //console.log(coinDataArray[i].priceUSD)
        var previousPriceUSD = coinDataArray[i].priceUSD;

        if(returnedUSD !== previousPriceUSD){
          if(returnedUSD > previousPriceUSD){
            coinStatusTempList.push('green')
          } else if (returnedUSD < previousPriceUSD){
            coinStatusTempList.push('red')
          }
        }
      }
    }

    setStatusArray(coinStatusTempList);
    
    setCoinDataArray(coinDataTempList);

    if(coinDataArray.length === 20){
      setSpinnerActive(false);
    }
     
  }


  useEffect(()=>{
    coinListPopulator();
    apiCall();
    // const time = setInterval(()=>{
    //   setSpinnerActive(false);
    // }, 5000);

    // return ()=> clearInterval(time);
  },[]);

  useEffect(()=>{   
    const timer = setInterval(()=>{
      console.log('call 2');
        apiCall();
    },4000);
    
    return () => clearInterval(timer);
    
  },[coinDataArray,statusArray]);

  var gridList = [];
  for (var i=0;i<coinDataArray.length-1;i+=2){
    gridList.push(
      <div key={`coin_${i}`}>
        
        <Grid container xs={12}>
          <Grid item md={1} sm={12} lg={1} xs={12}></Grid>
        <Grid item md={4} sm={12} lg={4} xs={12}>
          <Coin coin={coinDataArray[i].coin} imgUrl={coinImgList[i]} usd={coinDataArray[i].priceUSD} inr={coinDataArray[i].priceINR} cad={coinDataArray[i].priceCAD} statusImg={statusArray[i] === 'green' ? greenTriangle:redTriangle} /> {/* statusImg={status === 'green' ? greenTriangle:redTriangle}*/}
        </Grid>
        <Grid item md={2} sm={12} lg={2} xs={12}><br/></Grid>
        <Grid item md={4} sm={12} lg={4} xs={12}>
          <Coin coin={coinDataArray[i+1].coin} imgUrl={coinImgList[i+1]} usd={coinDataArray[i+1].priceUSD} inr={coinDataArray[i+1].priceINR} cad={coinDataArray[i+1].priceCAD} statusImg={statusArray[i+1] === 'green' ? greenTriangle:redTriangle} />
        </Grid>
        <Grid item md={1} sm={12} lg={1} xs={12}></Grid>
        </Grid>
        <br/>
      </div>
    );
  }
  
  return (
    <LoadingScreen
    loading={spinnerActive}
    bgColor='#212121'
    spinnerColor='#ffd000'
    textColor='#2fff00'
    logoSrc={logo}
    text='Loading coins....'
  > 
    <div>
        
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Routes/>
          </Grid>
          <Grid item xs={12}>
          {gridList}
          </Grid>
        </Grid>

      </div>
  </LoadingScreen>
      
  );
}

export default App;