import React from 'react'

 function LastPriceCard(props) {
 
  return (
    <div>
        <p className='importantText'>{props.lastPrice} {props.currency} </p>
        {props.priceChangeDirection}
    </div>
  )
}

export default LastPriceCard