import React from 'react'
import { useState, useEffect, useRef } from "react"
import LastPrice from './realtime-data/LastPrice'
import LastPriceCard from './realtime-data/LastPriceCard'
import { fetchCompanyQuote } from '../../services/StockApiService'

function SymbolPrices(props) {

  const [isDownloaded, setIsDownloaded] = useState(false)
  const [priceData, setPriceData] = useState({})

  const fetchData = async () => {
    await fetchCompanyQuote(props.company)
      .then(response => {
        setPriceData(response.data)
        setIsDownloaded(true)
      })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const textToDisplay = [`Change: ${priceData.d} ${props.currency}`,
  `High price of the day: ${priceData.h} ${props.currency}`,
  `Low price of the day: ${priceData.l} ${props.currency}`,
  `Open price of the day: ${priceData.o} ${props.currency}`,
  `Previous close price: ${priceData.pc} ${props.currency}`]

  return (
    <div className='symbolSubGridItem leftAlignedInfo'>
      {isDownloaded ?
        <LastPrice lastKnownPrice={priceData.c}
          currency={props.currency} />
        :
        <LastPriceCard lastPrice={0}
          currency={""} />
      }

      {textToDisplay.map(
        textItem => <p key={textItem}>{textItem}</p>
      )}
    </div>
  )
}

export default SymbolPrices