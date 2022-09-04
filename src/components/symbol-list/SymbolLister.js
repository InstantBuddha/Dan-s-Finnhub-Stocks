import React, { Component } from 'react'
import { useEffect, useState } from 'react'
import SymbolCard from './SymbolCard'
import Searchbar from '../universal/Searchbar'
import SearchMessage from '../universal/SearchMessage'
import Paginator from '../universal/Paginator'
import { fetchStockExchange } from '../../services/StockApiService'
import { updateSearchResults } from '../../services/SearchServices'

function SymbolLister(props) {
  const [stockData, setStockData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)
  const [paginateAmount, setPaginateAmount] = useState(25)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const country = "US"
    const fetchData = async () => {
      await fetchStockExchange(country)
        .then(response => {
          const flatStockData = response.data.flat().sort((a, b) => {
            return a.symbol.localeCompare(b.symbol)
          })
          setStockData(flatStockData)
        })
        .catch(error => { console.log(error) })
    }
    fetchData()
  }, [])

  const updateSearchResult = (searchTerm) => {
    setSearchResults(updateSearchResults(searchTerm, stockData))
    setIsSearchPerformed(true)
  }

  const displayContent = () => {
    if (isSearchPerformed && searchResults.length < 1) {
      return <SearchMessage message={"Nothing found"} />
    } else {
      const symbols = searchResults.length > 0 ?
        searchResults
        :
        stockData.slice(currentPage * paginateAmount,
          (currentPage + 1) * paginateAmount)

      return mapSymbolResults(symbols)
    }
  }

  const mapSymbolResults = (symbolsToMap) => {
    return symbolsToMap.map(
        symbol => <SymbolCard key={symbol.symbol}
        symbol={symbol.symbol}
        currency={symbol.currency}
        description={symbol.description}
        type={symbol.type} />
    )
  }

  const changeCurrentPage = (isAddition) => {
    isAddition ?
      setCurrentPage(currentPage+1)
      :
      currentPage>0 && setCurrentPage(currentPage-1)
  }

  const changePaginateAmount = (newAmount) =>{
    return setPaginateAmount(newAmount)
  }

  return (
    <div className='centerWrapper'>
      <Searchbar searchSymbol={updateSearchResult} />
      {!isSearchPerformed &&
        stockData.length > 0 &&
        <Paginator currentPage={currentPage}
                   changeCurrentPage={changeCurrentPage}
                   changePaginateAmount={changePaginateAmount} />
      }

      {stockData.length > 0 ?
        displayContent() : <p>Downloading data...</p>}

      {!isSearchPerformed &&
        stockData.length > 0 &&
        <Paginator currentPage={currentPage}
                   changeCurrentPage={changeCurrentPage}
                   changePaginateAmount={changePaginateAmount} />
      }
    </div>
  )
}

export default SymbolLister