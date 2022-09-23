import React from 'react'

function FavCard(props) {
  return (
    <div>
      <h1>{props.symbol}</h1>
    </div>
  )
}

export default React.memo(FavCard)