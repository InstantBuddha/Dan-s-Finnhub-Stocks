import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import SymbolInformation from './SymbolInformation'
import SymbolPrices from './SymbolPrices'
import SymbolTitle from './SymbolTitle'
import { fetchCompanyDetails } from '../../services/StockApiService'

function SymbolScreen() {
  const { symbol } = useParams()
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false)
  const [companyData, setCompanyData] = useState({})

  const fetchData = async () => {      
    await fetchCompanyDetails(symbol)
      .then(response => {
        setCompanyData(response.data)
        setIsCompanyDataDownloaded(true)
      })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {    
    fetchData()
  }, [])

  return (
    <div className='centerWrapper'>
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