import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UniversalSymbolCard from './UniversalSymbolCard'
import Searchbar from './Searchbar'
import SearchMessage from './SearchMessage'
import Paginator from './Paginator'
import { fetchUniversalMarket } from '../../services/StockApiService'


function UniversalSymbolLister() {
  const { exchangeType, market } = useParams()
  const [stockData, setStockData] = useState([])
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [paginateAmount, setPaginateAmount] = useState(25)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await fetchUniversalMarket(exchangeType, market)
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
    const updatedSearchResults = stockData.filter(stockObject => {
      return isTermIncluded(searchTerm, [stockObject.symbol, stockObject.description])
    })
    setSearchResults(updatedSearchResults)
    setIsSearchPerformed(true)
  }

  const isTermIncluded = (searchTerm, valuesToCheck) => {
    return valuesToCheck.some(value => {
      return value.toLowerCase().includes(searchTerm.toLowerCase())
    })
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
      symbol => <UniversalSymbolCard
        key={symbol.symbol}
        symbol={symbol.symbol}
        description={symbol.description}
        displaySymbol={symbol.displaySymbol}
        exchangeType={exchangeType}
        market={market} />
    )
  }

  const changeCurrentPage = (isAddition) => {
    isAddition ?
      setCurrentPage(currentPage + 1)
      :
      currentPage > 0 && setCurrentPage(currentPage - 1)
  }

  const changePaginateAmount = (newAmount) => {
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

export default UniversalSymbolLister