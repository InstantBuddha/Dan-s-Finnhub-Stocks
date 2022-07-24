import React from 'react'

const changeSymbols = {
  increase: <p>&#9650;</p>,
  decrease: <p>&#9660;</p>,
  noChange: <p> </p>
}

 function LastPriceCard(props) {
  console.log(props.priceChangeDirection)
  return (
    <div>
        <p className='importantText'>{props.lastPrice} {props.currency} </p>
        {changeSymbols[props.priceChangeDirection]}
    </div>
  )
}

export default LastPriceCard