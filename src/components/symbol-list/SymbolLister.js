import React, { Component } from 'react'
import axios from 'axios'
import SymbolCard from './SymbolCard'
import Searchbar from './Searchbar'
import SearchMessage from './SearchMessage'
import Paginator from './Paginator'

const apiUrlParts = {
  base: "https://finnhub.io/api/v1",
  stockSymbols: "/stock/symbol?exchange=",
  token: "&token=c1mrjdi37fktai5sgaog"

}

class SymbolLister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stockData: [],
      searchResults: [],
      isSearchPerformed: false,
      paginateAmount: 25,
      currentPage: 0
    }

    this.getJSON = this.getJSON.bind(this)
    this.updateSearchResult = this.updateSearchResult.bind(this)
    this.isTermIncluded = this.isTermIncluded.bind(this)
    this.mapSymbolResults = this.mapSymbolResults.bind(this)
    this.displayContent = this.displayContent.bind(this)
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
    this.changePaginateAmount = this.changePaginateAmount.bind(this)
  }

  async componentDidMount() {
    const country = "US"
    const stockSymbolsUrl = `${apiUrlParts.base}${apiUrlParts.stockSymbols}${country}${apiUrlParts.token}`
    this.getJSON(stockSymbolsUrl)
  }

  async getJSON(url) {
    await axios.get(url)
      .then(response => {
        let copiedTempState = { ...this.state }
        copiedTempState.stockData = response.data.flat().sort((a, b) => {
          return a.symbol.localeCompare(b.symbol)
        })
        copiedTempState.isReady = true
        this.setState(copiedTempState)
      })
      .catch(error => { console.log(error) })
  }

  updateSearchResult(searchTerm) {
    let copiedTempState = { ...this.state }
    const searchResults = this.state.stockData.filter(stockObject => {
      return this.isTermIncluded(searchTerm, [stockObject.symbol, stockObject.description])
    })
    copiedTempState.searchResults = searchResults
    copiedTempState.isSearchPerformed = true
    this.setState(copiedTempState)
  }

  isTermIncluded(searchTerm, valuesToCheck) {
    return valuesToCheck.some(value => {
      return value.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  displayContent() {
    if (this.state.isSearchPerformed && this.state.searchResults.length < 1) {
      return <SearchMessage message={"Nothing found"} />
    } else {
      const symbols = this.state.searchResults.length > 0 ?
        this.state.searchResults
        :
        this.state.stockData.slice(this.state.currentPage * this.state.paginateAmount,
          (this.state.currentPage + 1) * this.state.paginateAmount)

      return this.mapSymbolResults(symbols)
        
    }
  }

  mapSymbolResults(symbolsToMap) {
    return symbolsToMap.map(
      symbol => <SymbolCard key={symbol.symbol}
        symbol={symbol.symbol}
        currency={symbol.currency}
        description={symbol.description}
        type={symbol.type} />
    )
  }

  changeCurrentPage(isAddition){    
    let copiedTempState = { ...this.state }
    
    isAddition ?
      copiedTempState.currentPage++ :
      copiedTempState.currentPage>0 && copiedTempState.currentPage--

    this.setState(copiedTempState)
  }

  changePaginateAmount(newAmount){
    let copiedTempState = { ...this.state }
    copiedTempState.paginateAmount = newAmount
    copiedTempState.currentPage = 0
    this.setState(copiedTempState)
  }

  render() {
    return (<div>
      <Searchbar searchSymbol={this.updateSearchResult} />
      {!this.state.isSearchPerformed &&
        this.state.stockData.length > 0 &&
        <Paginator currentPage={this.state.currentPage}
                   changeCurrentPage={this.changeCurrentPage}
                   changePaginateAmount={this.changePaginateAmount} />
      }

      {this.state.stockData.length > 0 ?
        this.displayContent() : <p>Downloading data...</p>}

      {!this.state.isSearchPerformed &&
        this.state.stockData.length > 0 &&
        <Paginator currentPage={this.state.currentPage}
                   changeCurrentPage={this.changeCurrentPage}
                   changePaginateAmount={this.changePaginateAmount} />
      }
    </div>

    )
  }
}

export default SymbolLister