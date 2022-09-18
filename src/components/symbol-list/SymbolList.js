import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SymbolCard from './SymbolCard'
import UniversalSymbolCard from '../universal/UniversalSymbolCard'
import Searchbar from '../searchbar-paginator/Searchbar'
import SearchMessage from '../searchbar-paginator/SearchMessage'
import Paginator from '../searchbar-paginator/Paginator'
import { fetchUniversalMarket } from '../../services/StockApiService'
import { updateSearchResults } from '../../services/SearchServices'

function SymbolList(props) {
  let { exchangeType, market } = useParams()
  const [stockData, setStockData] = useState([])
  const [isListDownloaded, setIsListDownloaded] = useState(false)
  const [presentExchange, setPresentExchange] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)
  const [paginateAmount, setPaginateAmount] = useState(25)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await fetchUniversalMarket(exchangeType, market)
      .then(response => {
        const flatStockData = response.data.flat().sort((a, b) => {
          return a.symbol.localeCompare(b.symbol)
        })
        setStockData(flatStockData)
        setPresentExchange(exchangeType)
        setIsListDownloaded(true)
      })
      .catch(error => { console.log(error) })
  }

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
    if (exchangeType === "stock-market") {
      return symbolsToMap.map(
        symbol => <SymbolCard
          key={symbol.symbol}
          symbol={symbol.symbol}
          currency={symbol.currency}
          description={symbol.description}
          type={symbol.type} />
      )
    }

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

  useEffect(() => {
    if (exchangeType !== presentExchange) {
      setIsListDownloaded(false)
      fetchData()
    }
  })

  useEffect(() => {
    return () => {
      console.log("unmount")
    }
  }, [])

  return (
    <div className='centerWrapper'>
      {isListDownloaded ?
        <div>
          <Searchbar searchSymbol={updateSearchResult} />
          {!isSearchPerformed &&
            <Paginator currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
              changePaginateAmount={changePaginateAmount} />
          }

          {displayContent()}

          {!isSearchPerformed &&
            <Paginator currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
              changePaginateAmount={changePaginateAmount} />
          }
        </div>
        :
        <p>Downloading data...</p>
      }
    </div>
  )
}

export default React.memo(SymbolList)