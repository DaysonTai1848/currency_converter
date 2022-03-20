import React from 'react';
import "./CurrencyRow.css";

const CurrencyRow = (props) => {

  // destructure / spread it into object 
  const {currencyOptions} = props

  return (
    <div className='CurrencyRow'>

        {/* type="nubmer" ensures that user is only able to type in numbers */}
        <input type="number" className='input-box'/>
        <select className='drop-down'>
          {currencyOptions.map(option =>(
            <option key={option} value={option}>{option}</option>
          ))}
          
        </select>
    </div>
        
    
  )
}

export default CurrencyRow