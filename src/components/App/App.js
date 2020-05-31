import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';
import SystemSelect from '../SystemSelect/SystemSelect';
import Router from '../Routes/Routes';
import {Grid} from '@material-ui/core';

function App() {
  const [btcprice,setBtcPrice] = useState(0);
  const [status,setStatus] = useState('red');
  const [system,setSystem] = useState('cryptocompare');
  
  var previousPrice = 0;

  async function apiCall(){
    if (system === 'coinlore'){
      console.log(`Current System ->>>>>> coinlore`)
      previousPrice = btcprice;
      console.log(`Previous -> ${previousPrice}`);
      const response = await axios.get('https://api.coinlore.net/api/ticker/?id=90');
      const returnedPrice = response.data[0].price_usd;
      console.log(`New Response -> ${returnedPrice}`)
      if(returnedPrice !== btcprice){
        setBtcPrice(returnedPrice);

        if(returnedPrice > previousPrice){
          console.log('Set Green')
          setStatus('green');
        } else if (returnedPrice < previousPrice){
          console.log('Set Red')
          setStatus('red');
        }
      }
    }

    else if(system === 'cryptocompare'){
      console.log(`Current System ->>>>>> cryptocompare`)
      previousPrice = btcprice;
      console.log(`Previous -> ${previousPrice}`);
      const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
      const returnedPrice = response.data.USD;
      console.log(`New Response -> ${returnedPrice}`)
      if(returnedPrice !== btcprice){
        setBtcPrice(returnedPrice);

        if(returnedPrice > previousPrice){
          console.log('Set Green')
          setStatus('green');
        } else if (returnedPrice < previousPrice){
          console.log('Set Red')
          setStatus('red');
        }
      }
    }
  }

  useEffect(()=>{
    console.log('call 1');
    apiCall();
    const timer = setInterval(()=>{
      console.log('call 2');
        apiCall();
    },5000);
    
    return () => clearInterval(timer);
  },[btcprice,system]);

  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Router/>
        </Grid>
        <Grid item xs={12}>
          <SystemSelect onChange={setSystem} system={system}/>
        </Grid>
      </Grid>

    <div>
      
      
      <br/>

      BTC to USD:
      <br/>
      Price: {' '}
        <p>{btcprice}</p>
        

      <div>
       Status: {' '} <img src={status === 'green' ? greenTriangle:redTriangle} />
      </div>
    </div>

    
    </div>
  );
}

export default App;
