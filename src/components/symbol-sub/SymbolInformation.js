import React, { Component } from 'react'
import axios from 'axios'

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    companyDetail: "/stock/profile2?symbol=",
    token: "&token=c1mrjdi37fktai5sgaog",
}

class SymbolInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: this.props.company,
            isDownloaded: false,
            companyData: {}
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
                let copiedTempState = { ...this.state }
                copiedTempState.isDownloaded = true
                copiedTempState.companyData = response.data
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

    }


    render() {
        return (            
            <div>
                <div>
                    <h1>{this.state.company}</h1>
                    <h2>{this.state.companyData.name}</h2>
                    <a href={this.state.companyData.weburl} target="_blank" >{this.state.companyData.weburl}</a>
                </div>
                <div>
                    <div>
                        <p>Country: {this.state.companyData.country}</p>
                        <p>Currency: {this.state.companyData.currency}</p>
                        <p>Exchange: {this.state.companyData.exchange}</p>
                        <p>Industry: {this.state.companyData.finnhubIndustry}</p>
                        <p>IPO: {this.state.companyData.ipo}</p>
                        <p>Share outsanding: {this.state.companyData.shareOutstanding}</p>
                    </div>
                    <div>
                        <img src={this.state.companyData.logo} alt={this.state.company} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SymbolInformation