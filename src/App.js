import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [btcprice,setBtcPrice] = useState(0);
  const [status,setStatus] = useState('NoGo')

  useEffect(()=>{
    setInterval(async ()=>{
        const response = await axios.get('https://api.coinlore.net/api/ticker/?id=90');
        //const response = await axios.get('https://api.exchangeratesapi.io/latest?symbols=INR&base=USD');
        console.log('>>>>>>>>>>>>>')
        console.log(response.data[0].price_usd)
        if(response.data[0].price_usd !== btcprice){
          setBtcPrice(response.data[0].price_usd);
          setStatus('Go');
        }else{
          setStatus('NoGo');
        }
    },5000)
        
  },[btcprice]);

  return (
    <div>
      BTC to USD:
      <br/>
      Price: {' '}
        <p>{btcprice}</p>

      <div>
        Status: {' '} <p>{status}</p>
      </div>
    </div>
  );
}

export default App;
