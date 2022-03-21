import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import "./App.css";
import CurrencyRow from './CurrencyRow';

// Exchange rate API 
const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=c3bb248ffbd74b0d62fcfeee86559a21";

function App() {
  // Set a hook, an empty array [] is used because we haven't selected 
  // a currencyOptions at the beginning   
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // convert from what currency?
  // useState is empty by default, why?
  // fromCurrency is only one variable, not an array
  const [fromCurrency, setFromCurrency] = useState();

  // convert to what currency
  const [toCurrency, setToCurrency] = useState();

  //
  const [amount, setAmount] = useState(1);

  // which one box is the user entering numbers?
  // use this to determine which box to update value
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  // exchange rate, no defalut value
  const [exchangeRate, setExchangeRate] = useState();

  // calculate the values
  let toAmount, fromAmount;

  // user enters the value in the first box 
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  // else if amount is in "toCurrency" OR second box
  else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

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

        // the base and rate comes from the API, not from users' choice in website
        const firstCurrency = Object.keys(data.rates)[0];
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);

        // why is it square bracket?
        setExchangeRate(data.rates[firstCurrency]);
      })
  }, [])


  // when the selected currencies change, fetch new exchange rate
  useEffect(() => {
    if(toCurrency!=null){
      fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
    
  }, [fromCurrency, toCurrency])


  
  // function to display final results, value of currency at first box
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  // function to display final results, value of currency at second box
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }


  
  // Empty array is used, it will never change
  // hence the useEffect will only execute once ( when webpage is loaded )

  return (
    <div className='container'>
      <h1>Currency Converter</h1>
      <CurrencyRow 
        currencyOptions = {currencyOptions}
        selectedCurrency = {fromCurrency}
        onChangeCurrency = {e => setFromCurrency(e.target.value)} 
        amount = {fromAmount}
        onChangeAmount = {handleFromAmountChange}
      />
      <p>=</p>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)} 
        amount = {toAmount}
        onChangeAmount = {handleToAmountChange}
      />
    </div>
  )
}

export default App