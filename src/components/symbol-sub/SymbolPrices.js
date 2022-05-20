import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import LastPrice from './realtime-data/LastPrice'

const apiUrlParts = {
  base: "https://finnhub.io/api/v1",
  quoteSymbol: "/quote?symbol=",
  token: "&token=c1mrjdi37fktai5sgaog",
}

function SymbolPrices(props) {

  const [isDownloaded, setIsDownloaded] = useState(false)
  const [priceData, setPriceData] = useState({})

  useEffect(() => {
    const companyQuoteUrl = `${apiUrlParts.base}${apiUrlParts.quoteSymbol}${props.company}${apiUrlParts.token}`
    const fetchData = async (companyQuoteUrl) => {
      await axios.get(companyQuoteUrl)
        .then(response => {
          setIsDownloaded(true)
          setPriceData(response.data)
        })
        .catch(error => { console.log(error) })
    }

    fetchData(companyQuoteUrl)
  }, [])

  const textToDisplay = [`Change: ${priceData.d} USD`,
                         `High price of the day: ${priceData.h} USD`,
                         `Low price of the day: ${priceData.l} USD`,
                         `Open price of the day: ${priceData.o} USD`,
                         `Previous close price: ${priceData.pc} USD`,]

  return (
    <div className='symbolSubGridItem leftAlignedInfo'>
      <LastPrice symbol={props.symbol} lastKnownPrice={priceData.c} />
      {textToDisplay.map(
        textItem => <p key={textItem}>{textItem}</p>
      )}
    </div>
  )
}

export default SymbolPrices