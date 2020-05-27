import React, { useState, useEffect } from 'react';
import axios from 'axios';
import greenTriangle from './assets/greenT.png';
import redTriangle from './assets/redT.png';

function App() {
  const [btcprice,setBtcPrice] = useState(0);
  const [status,setStatus] = useState('red');
  
  var previousPrice = 0;

  async function apiCall(){
    previousPrice = btcprice;
    const response = await axios.get('https://api.coinlore.net/api/ticker/?id=90');
    //const response = await axios.get('https://api.exchangeratesapi.io/latest?symbols=INR&base=USD');
    console.log('>>>>>>>>>>>>>')
    console.log(response.data[0].price_usd)
    if(response.data[0].price_usd !== btcprice){
      setBtcPrice(response.data[0].price_usd);
    }
  }

  function setImage(){
    if(btcprice > previousPrice){
    setStatus('green');
    }else if(btcprice < previousPrice) {
      setStatus('red');
    }
  }

  useEffect(()=>{
    apiCall();
    setImage()
    const timer = setInterval(()=>{
      console.log('call 2')
        apiCall()
        setImage()
    },5000)
    
    return () => clearInterval(timer);
  },[btcprice,status]);

  return (
    <div>
      BTC to USD:
      <br/>
      Price: {' '}
        <p>{btcprice}</p>

      <div>
       Status: {' '} <img src={status === 'green' ? greenTriangle:redTriangle} />
      </div>
    </div>
  );
}

export default App;
