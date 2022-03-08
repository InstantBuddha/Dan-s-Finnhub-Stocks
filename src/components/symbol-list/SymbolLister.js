import React, { Component } from 'react'
import axios from 'axios'
import SymbolCard from './SymbolCard'
import Searchbar from './Searchbar'
import SearchMessage from './SearchMessage'

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
      isSearchPerformed: false
    }

    this.getJSON = this.getJSON.bind(this)
    this.updateSearchResult = this.updateSearchResult.bind(this)
    this.isTermIncluded = this.isTermIncluded.bind(this)
    this.mapSymbolResults = this.mapSymbolResults.bind(this)
  }

  async componentDidMount() {
    const country = "US"
    const filterNY = "&mic=XNYS"
    const stockSymbolsUrl = `${apiUrlParts.base}${apiUrlParts.stockSymbols}${country}${apiUrlParts.token}${filterNY}`
    this.getJSON(stockSymbolsUrl)
  }

  async getJSON(url) {
    await axios.get(url)
      .then(response => {
        let copiedTempState = { ...this.state }
        copiedTempState.stockData = response.data.sort((a,b)=>{
          return a.symbol.localeCompare(b.symbol)
        })
        copiedTempState.isReady = true
        this.setState(copiedTempState)
      })
      .catch(error => { console.log(error) })
  }

  updateSearchResult(searchTerm) {
    let copiedTempState = { ...this.state }
    const searchResults = this.state.stockData.flat().filter(stockObject => {
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

  mapSymbolResults() {

    if (this.state.isSearchPerformed && this.state.searchResults.length < 1) {
      return <SearchMessage message={"Nothing found"} />
    } else {
      const symbols = this.state.searchResults.length > 0 ?
        this.state.searchResults : this.state.stockData
      return symbols.map(
        symbol => <SymbolCard key={symbol.symbol}
          symbol={symbol.symbol}
          currency={symbol.currency}
          description={symbol.description}
          type={symbol.type} />
      )
    }

  }

  render() {
    return (<div>
      <h1>SymbolLister</h1>
      <Searchbar searchSymbol={this.updateSearchResult} />
      {this.state.stockData.length > 0 ?
        this.mapSymbolResults() : <p>Downloading data...</p>}

    </div>

    )
  }
}

export default SymbolLister