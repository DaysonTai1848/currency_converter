import React, { useState, useEffect } from 'react';
import "./App.css";
import CurrencyRow from './CurrencyRow';

// Exchange rate API 
const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=c3bb248ffbd74b0d62fcfeee86559a21&format=1";

function App() {
  // Set a hook, an empty array [] is used because we haven't selected 
  // a currencyOptions at the beginning   
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // check 
  console.log(currencyOptions);

  // useEffect will execute function / update whenever the array changes
  // an empty array that we give will never change
  // This will get us the latest currency rates 
  useEffect(() =>{
    // fetch command allows us to get data from the web OR API
    fetch(BASE_URL)
      // convert the response we get to json format
      .then(res => res.json())
      // the actual data object
      .then(data => {
        // Convert data into an array of options using popul
        // data.base = the base currency selected to calculate ratio, eg: EUR
        // ...Object.key == destructure array, 把 array element 均匀分布
        // Object.key (data.rates 是 USD: 1.106, Object.key 只取 USD 的部分)
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      })
  }, [])

  

  
  // Empty array is used, it will never change
  // hence the useEffect will only execute once ( when webpage is loaded )

  return (
    <div className='container'>
      <h1>Currency Converter</h1>
      <CurrencyRow 
        currencyOptions= {currencyOptions}
      />
      <p>=</p>
      <CurrencyRow 
        currencyOptions={currencyOptions}
      />
    </div>
  )
}

export default App