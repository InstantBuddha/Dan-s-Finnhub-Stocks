import React from 'react'
import { useParams } from 'react-router-dom'
import SymbolScreen from './SymbolScreen'

function SymbolScreenWrapper() {
    const {symbol} = useParams()

  return (
    <div>
        <SymbolScreen company={symbol}/>
    </div>
  )
}

export default SymbolScreenWrapper