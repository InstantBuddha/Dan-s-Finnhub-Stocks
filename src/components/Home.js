import React, { Component } from 'react'
import LastPrice from './realtime-data/LastPrice'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const symbol = "TSLA"
    return <div>
      <h1>Finnhub Stocks</h1>
      <Link to={`/realtime-${symbol}`} className="link">For testing</Link>
    </div>
  }
}

export default Home