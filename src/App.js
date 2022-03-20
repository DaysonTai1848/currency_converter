import React, { useState, useEffect } from 'react';
import "./App.css";
import CurrencyRow from './CurrencyRow';

// Exchange rate API 
const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  // Set a hook, an empty array [] is used because we haven't selected 
  // a currencyOptions at the beginning   
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // useEffect will execute function / update whenever the array changes
  useEffect(() =>{
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })

  }, []);
  // Empty array is used, it will never change
  // hence the useEffect will only execute once ( when webpage is loaded )

  return (
    <div className='container'>
      <h1>Currency Converter</h1>
      <CurrencyRow />
      <p>=</p>
      <CurrencyRow />
    </div>
  )
}

export default App