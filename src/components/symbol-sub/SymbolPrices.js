import React from 'react'
import { useState, useEffect, useRef } from "react"
import { apiUrlParts } from '../../utils/Constants'
import axios from 'axios'
import LastPrice from './realtime-data/LastPrice'
import LastPriceCard from './realtime-data/LastPriceCard'

function SymbolPrices(props) {

  const [isDownloaded, setIsDownloaded] = useState(false)
  const [priceData, setPriceData] = useState({})

  useEffect(() => {
    const companyQuoteUrl = `${apiUrlParts.base}${apiUrlParts.quoteSymbol}${props.company}${apiUrlParts.token}`
    const fetchData = async (companyQuoteUrl) => {
      await axios.get(companyQuoteUrl)
        .then(response => {
          setPriceData(response.data)
          setIsDownloaded(true)
        })
        .catch(error => { console.log(error) })
    }

    fetchData(companyQuoteUrl)
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