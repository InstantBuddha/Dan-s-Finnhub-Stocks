import React, { Component } from 'react'
import axios from 'axios'

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    companyDetail: "/stock/profile2?symbol=",
    token: "&token=c1mrjdi37fktai5sgaog",
}

class SymbolScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            company: this.props.company,
            isDownloaded: false,
            compnyData: {},
            /*
            country: "",
            currency: "",
            exchange: "",
            industry: "",
            ipo: null,
            logo: "",
            marketCapitalization: 0,
            shareOutstanding: 0,
            web: ""*/
        }

        this.getJSON = this.getJSON.bind(this)
    }

    async componentDidMount() {
        const companyDetailsUrl = `${apiUrlParts.base}${apiUrlParts.companyDetail}${this.state.company}${apiUrlParts.token}`

        this.getJSON(companyDetailsUrl)
    }

    async getJSON(url) {
        await axios.get(url)
            .then(response => {
                console.log(response)
                let copiedTempState = { ...this.state }
                copiedTempState.isDownloaded = true
                copiedTempState.compnyData = response.data
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

    }


    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.company}</h1>
                    <h2>{this.state.compnyData.name}</h2>
                    <a href={this.state.compnyData.weburl} target="_blank" >{this.state.compnyData.weburl}</a>
                </div>
                <div>
                    <div>
                        <p>Country: {this.state.compnyData.country}</p>
                        <p>Currency: {this.state.compnyData.currency}</p>
                        <p>Exchange: {this.state.compnyData.exchange}</p>
                        <p>Industry: {this.state.compnyData.finnhubIndustry}</p>
                        <p>IPO: {this.state.compnyData.ipo}</p>
                        <p>Share outsanding: {this.state.compnyData.shareOutstanding}</p>
                    </div>
                    <div>
                        <img src={this.state.compnyData.logo} alt={this.state.company} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SymbolScreen