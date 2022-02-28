import React from 'react'

function SymbolCard(props) {
  return (
    <div>
    <h1>{props.symbol}</h1>
    <h5>{props.type}</h5>
    <p>{props.description}</p>
    </div>
  )
}

export default React.memo(SymbolCard) 