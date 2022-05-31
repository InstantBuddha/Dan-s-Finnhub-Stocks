import React, { Component } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    cryptoExch: "/crypto/exchange",
    token: "?token=c1mrjdi37fktai5sgaog"
  }

 function CryptoLister() {
     const [isListDownloaded, setIsListDownloaded] = useState(false)
     const [exchangeList, setExchangeList] = useState([])

     useEffect(()=>{
         const apiUrl = `${apiUrlParts.base}${apiUrlParts.cryptoExch}${apiUrlParts.token}`
         const fetchData = async (apiUrl) => {
             await axios.get(apiUrl)
                .then(response => {
                    setIsListDownloaded(true)
                    console.log(response)
                    setExchangeList(response.data)
                })
                .catch(error => {console.log(error) })
         }         
         fetchData(apiUrl)
     },[])

     const exchangePs = exchangeList.map(
         exchange => <p key={exchange}>{exchange}</p>
     )
  return (
    <div>
    <h1>CryptoLister</h1>
    {isListDownloaded ? 
    exchangePs : "Downloading list..."}
    </div>
  )
}
export default CryptoLister
