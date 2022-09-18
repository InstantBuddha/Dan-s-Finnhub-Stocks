import React from 'react'
import { Link } from 'react-router-dom'

function SymbolCard(props) {
  return (
    <div className='cardWrapper'>
      <h1>{props.description}</h1>
      <div className='gridContainer'>
        <div className='symbolCardGridItem'>
          <p>Symbol: {props.symbol}</p>
        </div>
        <div className='symbolCardGridItem'>
          <p> Stock type: {props.type}</p>
        </div>
      </div>
      <Link to={`/stock-market/US/${props.symbol}`} className="link">Open datasheet</Link>
    </div>
  )
}

export default React.memo(SymbolCard) 