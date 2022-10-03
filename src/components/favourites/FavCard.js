import React from 'react'
import { useState, useEffect } from 'react'
import { fetchCompanyDetails, fetchCompanyQuote } from '../../services/StockApiService'
import { deleteFromFavourites } from '../../utils/UseLocalStorage'
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

  const onDelete = ()=>{
    console.log("onDelete")
    deleteFromFavourites(props.symbol)
    props.updateFavList()
  }

  return (
    <div className='favCard'>
      { companyData.name && quoteData.c ?
        <FavCardContent logo={companyData.logo}
              key={props.symbol}
              symbol={props.symbol}
              name={companyData.name}
              price={quoteData.c}
              currency={companyData.currency}
              change={quoteData.dp}
              onDelete={onDelete} />
      :
        <p>Downloading data for {props.symbol}</p>
      }

      
    </div>
  )
}

export default FavCard