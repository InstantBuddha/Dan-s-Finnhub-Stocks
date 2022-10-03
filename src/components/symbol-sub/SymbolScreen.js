import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect} from "react"
import SymbolInformation from './SymbolInformation'
import SymbolPrices from './SymbolPrices'
import SymbolTitle from './SymbolTitle'
import { fetchCompanyDetails } from '../../services/StockApiService'
import { addToLocalStorage } from '../../utils/UseLocalStorage'
import {favTypes} from "../../utils/Constants"

function SymbolScreen() {
  const { symbol } = useParams()
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false)
  const [companyData, setCompanyData] = useState({})

  const fetchData = async () => {
    await fetchCompanyDetails(symbol)
      .then(response => {
        setCompanyData(response.data)
        if(response.data.name){setIsCompanyDataDownloaded(true)}
      })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='centerWrapper'>
      {isCompanyDataDownloaded ?
        <div>
          <SymbolTitle companyData={companyData} />
          <div className='gridContainer responsiveGrid'>

            <SymbolInformation companyData={companyData} />
            <SymbolPrices company={symbol}
              currency={companyData.currency}
            />
          </div>
          <button className='favButton'
                  onClick={()=> addToLocalStorage({symbol: symbol, type: favTypes.company})}>A</button>
        </div>
      :
        <p>Downloading data for {symbol}</p>
      }

    </div>

  )
}

export default SymbolScreen