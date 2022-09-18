import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SymbolCard from './SymbolCard'
import Searchbar from '../searchbar-paginator/Searchbar'
import SearchMessage from '../searchbar-paginator/SearchMessage'
import Paginator from '../searchbar-paginator/Paginator'
import { fetchUniversalMarket } from '../../services/StockApiService'
import { updateSearchResults } from '../../services/SearchServices'

function SymbolList(props) {
  let { exchangeType, market } = useParams()
  const [stockData, setStockData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)
  const [paginateAmount, setPaginateAmount] = useState(25)
  const [currentPage, setCurrentPage] = useState(0)

  //mindkét fájl megtartása és csak az egyforma dolgok kiszervezése vagy
  //egy fájl és berakni ifeket
  //itt a then univerzális, iffel lehetne az awaitet, utána egyforma
  useEffect(() => {
    console.log(exchangeType)
    //const country = market
    //így most már működik, csak a végén kell a displaynél az ifet berakni
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
  //egyforma
  const updateSearchResult = (searchTerm) => {
    setSearchResults(updateSearchResults(searchTerm, stockData))
    setIsSearchPerformed(true)
  }
  //egyforma
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
  //különböző, esetleg kiszervezhető
  const mapSymbolResults = (symbolsToMap) => {
    return symbolsToMap.map(
        symbol => <SymbolCard key={symbol.symbol}
        symbol={symbol.symbol}
        currency={symbol.currency}
        description={symbol.description}
        type={symbol.type} />
    )
  }
  //teljesen kiszervezhető
  const changeCurrentPage = (isAddition) => {
    isAddition ?
      setCurrentPage(currentPage+1)
      :
      currentPage>0 && setCurrentPage(currentPage-1)
  }
  //teljesen kiszervezhető
  const changePaginateAmount = (newAmount) =>{
    return setPaginateAmount(newAmount)
  }

  useEffect(() => {
    return () => {
      console.log("unmount")
    }
  }, [])

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

export default SymbolList