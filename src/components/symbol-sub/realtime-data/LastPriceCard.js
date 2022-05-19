import React from 'react'

 function LastPriceCard(props) {
 
  return (
    <div>
        <p className='importantText'>Last price: {props.lastPrice} USD</p>
        <p>Timestamp: {props.timeStamp} </p>
    </div>
  )
}

export default LastPriceCard