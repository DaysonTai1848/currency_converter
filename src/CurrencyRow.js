import React from 'react';
import "./CurrencyRow.css";

const CurrencyRow = () => {
  return (
    <div className='CurrencyRow'>
        <input className='input-box'/>
        <select className='drop-down'>
            <option value="myr">MYR - Malaysia</option>
            <option value="usd">USD - United States</option>
            <option value="cny">CNY - China</option>
            <option value="eur">EUR  - European Union</option>
            {/* <option value="jpy"></option>
            <option value="cad"></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option> */}
        </select>
    </div>
        
    
  )
}

export default CurrencyRow