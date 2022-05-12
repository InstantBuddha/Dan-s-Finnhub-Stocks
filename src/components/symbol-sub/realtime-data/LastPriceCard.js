import React from 'react'

 function LastPriceCard(props) {
 
  return (
    <div>
        <h2>Last price: {props.lastPrice} USD</h2>
        <h2>Timestamp: {props.timeStamp} </h2>
    </div>
  )
}

export default LastPriceCard