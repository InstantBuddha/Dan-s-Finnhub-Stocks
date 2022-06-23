import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import UniversalSymbolCard from './UniversalSymbolCard'



const apiUrlParts = {
  base: "https://finnhub.io/api/v1",
  stockSymbols: "/stock/symbol?exchange=",
  forex: "/forex/symbol?exchange=",
  crypto: "/crypto/symbol?exchange=",
  token: "&token=c1mrjdi37fktai5sgaog"
}

 function UniversalSymbolLister() {
  const {exchangeType, market } = useParams()  
  const [stockData, setStockData] = useState([])
  const [isDataDownloaded, setIsDataDownloaded] = useState(false)

  useEffect(() => {
    const url = `${apiUrlParts.base}${apiUrlParts[exchangeType]}${market}${apiUrlParts.token}`
    const fetchData = async (url) => {
      await axios.get(url)
        .then(response => {
          const flatStockData = response.data.flat().sort((a, b) => {
            return a.symbol.localeCompare(b.symbol)
          })
          
          setStockData(flatStockData)
          setIsDataDownloaded(true)
        })
        .catch(error => { console.log(error) })
    }
    fetchData(url)
  }, [])

  const displayContent = () => {
    
      return mapSymbolResults(stockData)
    
  }

  const mapSymbolResults = (symbolsToMap) => {
    return symbolsToMap.map(
        symbol => <UniversalSymbolCard 
                    key={symbol.symbol}
                    symbol={symbol.symbol}
                    description={symbol.description}
                    displaySymbol={symbol.displaySymbol}
                    exchangeType={exchangeType}
                    market={market} />
    )
  }

  return (
    <div><h1>{market}</h1>
    <h2>{exchangeType}</h2>
    {stockData.length > 0 ?
        displayContent() : <p>Downloading data...</p>}
    </div>
  )
}

export default UniversalSymbolLister