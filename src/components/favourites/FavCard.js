import React from 'react'
import { useState, useEffect } from 'react'
import { fetchCompanyDetails, fetchCompanyQuote } from '../../services/StockApiService'
import FavCardContent from './FavCardContent'

function FavCard(props) {
  const [companyData, setCompanyData] = useState({})
  const [quoteData, setQuoteData] = useState({})

  const fetchData = async () => {
    await fetchCompanyDetails(props.symbol)
      .then(response => {
        setCompanyData(response.data)
      })
      .catch(error => { console.log(error) })
  }

  const fetchQuoteData = async () => {
    await fetchCompanyQuote(props.symbol)
    .then(response => {
      setQuoteData(response.data)
    })
    .catch(error => { console.log(error) })
  }

  useEffect(() => {
    fetchData()
    fetchQuoteData()
  }, [])

  console.log(companyData, quoteData)
  return (
    <div className='favCard'>
      { companyData.name && quoteData.c ?
        <FavCardContent logo={companyData.logo}
              name={companyData.name}
              price={quoteData.c}
              currency={companyData.currency}
              change={quoteData.dp} />
      :
        <p>Downloading data for {props.symbol}</p>
      }

      
    </div>
  )
}

export default FavCard