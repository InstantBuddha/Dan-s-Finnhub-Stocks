import React, { Component } from 'react'
import axios from 'axios'

const apiUrlParts = {
  base: "https://finnhub.io/api/v1",
  stockSymbols: "/stock/symbol?exchange=US&token=",
  token: "c1mrjdi37fktai5sgaog",
  filterNY: "&mic=XNYS"
}

class MainWrapper extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

    

    async componentDidMount() {
      const testUrl = apiUrlParts.base + apiUrlParts.stockSymbols + apiUrlParts.token + apiUrlParts.filterNY

      await axios.get(testUrl)
          .then(response => {
              console.log(response)
          })
          .catch(error => { console.log(error) })

  }

    
  render() {
    return <div>
        <h1>Finnhub Stocks</h1>
    </div>
  }
}

export default MainWrapper