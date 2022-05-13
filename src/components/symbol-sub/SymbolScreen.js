import React from 'react'
import { useParams } from 'react-router-dom'
import LastPrice from './realtime-data/LastPrice'
import SymbolInformation from './SymbolInformation'
import SymbolPrices from './SymbolPrices'

function SymbolScreen() {
    const {symbol} = useParams()

  return (
    <div className='gridContainer responsiveGrid'>
        <SymbolInformation company={symbol}/>
        <SymbolPrices company={symbol}/>
    </div>
  )
}

export default SymbolScreen