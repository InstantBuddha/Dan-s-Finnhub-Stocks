import React from 'react'
import { changeSymbols } from '../../../utils/Constants'

 function LastPriceCard(props) {
  return (
    <div>
        <p className='importantText'>{props.lastPrice} {props.currency} </p>
        {changeSymbols[props.priceChangeDirection]}
    </div>
  )
}

export default LastPriceCard