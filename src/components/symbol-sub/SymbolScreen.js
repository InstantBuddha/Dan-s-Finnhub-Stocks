import React from 'react'
import { useParams } from 'react-router-dom'
import { apiUrlParts } from '../../utils/Constants'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import LastPrice from './realtime-data/LastPrice'
import SymbolInformation from './SymbolInformation'
import SymbolPrices from './SymbolPrices'
import SymbolTitle from './SymbolTitle'
import { fetchCompanyDetails } from '../../services/StockApiService'

function SymbolScreen() {
  const { symbol } = useParams()
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false)
  const [companyData, setCompanyData] = useState({})

  useEffect(() => {
    const fetchData = async () => {      
      await fetchCompanyDetails(symbol)
        .then(response => {
          setCompanyData(response.data)
          setIsCompanyDataDownloaded(true)
        })
        .catch(error => { console.log(error) })
    }

    fetchData()
  }, [])

  return (
    <div>
      <SymbolTitle companyData={companyData} />
      <div className='gridContainer responsiveGrid'>

        <SymbolInformation companyData={companyData} />
        <SymbolPrices company={symbol}
          currency={companyData.currency}
        />
      </div>
    </div>

  )
}

export default SymbolScreen