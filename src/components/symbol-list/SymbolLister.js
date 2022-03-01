import React, { Component } from 'react'
import axios from 'axios'
import SymbolCard from './SymbolCard'
import Searchbar from './Searchbar'

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
      filteredObjects: []
    }

    this.getJSON = this.getJSON.bind(this)
    this.searchSymbol = this.searchSymbol.bind(this)
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
        copiedTempState.stockData = response.data
        copiedTempState.isReady = true
        this.setState(copiedTempState)
      })
      .catch(error => { console.log(error) })
  }

  searchSymbol(searchTerm){
    console.log(searchTerm)
    this.state.stockData.map( item => {
      if(Object.values(item).includes(searchTerm)){console.log(item)}})
  }

  render() {
    console.log(this.state.stockData)
    const mappedSymbolCards = this.state.stockData.map(
      symbol => <SymbolCard key={symbol.symbol}
                            symbol={symbol.symbol}
                            currency={symbol.currency}
                            description={symbol.description} 
                            type={symbol.type} />
    )

    return (<div>
               <h1>SymbolLister</h1>
               <Searchbar searchSymbol={this.searchSymbol} />
               {this.state.stockData.length > 0 ?
                mappedSymbolCards : <p>Downloading data...</p>}

    </div>
     
    )
  }
}

export default SymbolLister