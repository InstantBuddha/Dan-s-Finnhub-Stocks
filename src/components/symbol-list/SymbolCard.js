import React from 'react'
import { Link } from 'react-router-dom'

function SymbolCard(props) {
  return (
    <div>
    <h1>{props.symbol}</h1>
    <Link to={`/${props.symbol}`} className="link">{props.symbol}</Link>
    <h5>{props.type}</h5>
    <p>{props.description}</p>
    </div>
  )
}

export default React.memo(SymbolCard) 