import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SymbolScreen from './symbol-sub/SymbolScreen'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return <div>
      <h1>Dan's Finnhub Stocks</h1>
    </div>
  }
}

export default Home