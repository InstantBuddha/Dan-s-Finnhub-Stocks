import React from 'react'

function ExchangeCard(props) {
  return (
    <div className='cardWrapper'>
        <h1>{props.exchangeName}</h1>
    </div>
  )
}

export default React.memo(ExchangeCard)