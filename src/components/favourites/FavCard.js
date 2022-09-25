import React from 'react'
import { useState, useEffect } from 'react'
import { fetchCompanyDetails } from '../../services/StockApiService'

function FavCard(props) {
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false)
  const [companyData, setCompanyData] = useState({})

  const fetchData = async () => {
    await fetchCompanyDetails(props.symbol)
      .then(response => {
        setCompanyData(response.data)
        setIsCompanyDataDownloaded(true)
      })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(companyData)
  return (
    <div className='favCard'>
      {isCompanyDataDownloaded ?
        <div>
          <h1>{props.symbol}</h1>
          <h2>{companyData.name}</h2>
        </div>
      :
        <p>Downloading data for {props.symbol}</p>
      }

      
    </div>
  )
}

export default React.memo(FavCard)