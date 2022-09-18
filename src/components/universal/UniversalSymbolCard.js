import React from 'react'
import { Link } from 'react-router-dom'

function UniversalSymbolCard(props) {
  const urlSafeSymbol = props.symbol.replace(/\//g, "_")
  
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
      <Link to={`/${props.exchangeType}/${props.market}/${urlSafeSymbol}`} className="link">Open datasheet</Link>
    </div>
  )
}

export default React.memo(UniversalSymbolCard)