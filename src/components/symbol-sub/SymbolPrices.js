import React, { Component } from 'react'
import axios from 'axios'

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    quoteSymbol: "/quote?symbol=",
    token: "&token=c1mrjdi37fktai5sgaog",
}

 class SymbolPrices extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        company: this.props.company,
        isDownloaded: false,
        priceData: {}
      }

      this.getJSON = this.getJSON.bind(this)
    }

    async componentDidMount() {
        const companyQuoteUrl = `${apiUrlParts.base}${apiUrlParts.quoteSymbol}${this.state.company}${apiUrlParts.token}`
        this.getJSON(companyQuoteUrl)
    }

    async getJSON(url) {
        await axios.get(url)
            .then(response => {
                console.log(response)
                let copiedTempState = { ...this.state }
                copiedTempState.isDownloaded = true
                copiedTempState.priceData = response.data
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

    }

  render() {
    return (
      <div>
          <p>Current stock price: {this.state.priceData.c} USD</p>
          <p>Change: {this.state.priceData.d} USD</p>
          <p>High price of the day: {this.state.priceData.h} USD</p>
          <p>Low price of the day: {this.state.priceData.l} USD</p>
          <p>Open price of the day: {this.state.priceData.o} USD</p>
          <p>Previous close price: {this.state.priceData.pc} USD</p>
      </div>
    )
  }
}

export default SymbolPrices