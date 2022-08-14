import React from 'react'
import { Link } from 'react-router-dom'

function ExchangeCard(props) {
  return (
    <div className='cardWrapper'>
        <h1><Link to={`/${props.exchangeType}/${props.exchangeName}`} className="link">{props.exchangeName}</Link></h1>
    </div>
  )
}

export default React.memo(ExchangeCard)