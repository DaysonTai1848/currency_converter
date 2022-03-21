import React from 'react';
import "./CurrencyRow.css";

const CurrencyRow = (props) => {

  // destructure / spread it into object 
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props

  return (
    <div className='CurrencyRow'>

        {/* type="nubmer" ensures that user is only able to type in numbers */}
        <input type="number" className='input-box' value={amount} onChange={onChangeAmount}/>
        <select className='drop-down' value={selectedCurrency} onChange={onChangeCurrency}>

          {/* this is a loop to populate all the currencies from API into the options */}
          
          {currencyOptions.map(option =>(
            <option key={option} value={option}>{option}</option>
          ))}
          
        </select>
    </div>
        
    
  )
}

export default CurrencyRow