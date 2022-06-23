import React from 'react'
import { Link } from 'react-router-dom'

function UniversalSymbolCard(props) {
  return (
    <div className='cardWrapper'>
      <h1>{props.displaySymbol}</h1>
      <div className='gridContainer'>
        <div className='symbolCardGridItem'>
          <p>Symbol: {props.symbol}</p>
        </div>
        <div className='symbolCardGridItem'>
          <p> Description: {props.description}</p>
        </div>
      </div>
      <p>Link will come here {props.exchangeType} {props.market}</p>
    </div>
  )
}

export default React.memo(UniversalSymbolCard)