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
                console.log(response)
                let copiedTempState = { ...this.state }
                copiedTempState.isDownloaded = true
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

    }


    render() {
        return (
            <div>
                <h1>{this.state.company}</h1>
            </div>
        )
    }
}

export default SymbolScreen