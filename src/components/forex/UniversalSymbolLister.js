import React from 'react'
import { useParams } from 'react-router-dom'

 function UniversalSymbolLister() {
  const {exchangeType, market } = useParams()  

  console.log(exchangeType)
  return (
    <div><h1>{market}</h1></div>
  )
}

export default UniversalSymbolLister