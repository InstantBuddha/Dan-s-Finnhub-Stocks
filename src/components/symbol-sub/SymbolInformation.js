import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            isDownloaded: false
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
            <div className='symbolSubGridItem'>
                <div className='gridContainer leftAlignedInfo'>
                    <div>
                        <img src={this.props.companyData.logo} alt={this.props.companyData.company} className='companyLogo'/>
                    </div>
                    <div>
                        <h1>{this.props.companyData.company}</h1>
                        <h2>{this.props.companyData.name}</h2>
                        <a href={this.props.companyData.weburl} target="_blank" >{this.props.companyData.weburl}</a>
                    </div>
                    
                </div>
                <div>
                    <div className='leftAlignedInfo'>
                        <p>Country: {this.props.companyData.country}</p>
                        <p>Currency: {this.props.companyData.currency}</p>
                        <p>Exchange: {this.props.companyData.exchange}</p>
                        <p>Industry: {this.props.companyData.finnhubIndustry}</p>
                        <p>IPO: {this.props.companyData.ipo}</p>
                        <p>Share outsanding: {this.props.companyData.shareOutstanding}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SymbolInformation