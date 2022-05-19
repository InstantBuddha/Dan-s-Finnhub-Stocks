import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import LastPrice from './realtime-data/LastPrice'
import SymbolInformation from './SymbolInformation'
import SymbolPrices from './SymbolPrices'

const apiUrlParts = {
  base: "https://finnhub.io/api/v1",
  companyDetail: "/stock/profile2?symbol=",
  token: "&token=c1mrjdi37fktai5sgaog",
}

function SymbolScreen() {
    const {symbol} = useParams()
    const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false)
    const [companyData, setCompanyData] = useState({})

    useEffect(() => {
      const companyDetailsUrl = `${apiUrlParts.base}${apiUrlParts.companyDetail}${symbol}${apiUrlParts.token}`
      const fetchData = async (companyDetailsUrl) => {
        await axios.get(companyDetailsUrl)
          .then(response =>{
            setIsCompanyDataDownloaded(true)
            setCompanyData(response.data)
          })
          .catch(error => {console.log(error) })
      }

      fetchData(companyDetailsUrl)
    },[])

  return (
    <div className='gridContainer responsiveGrid'>
        <SymbolInformation company={symbol}
                           companyData={companyData}
        />
        <SymbolPrices company={symbol}/>
    </div>
  )
}

export default SymbolScreen