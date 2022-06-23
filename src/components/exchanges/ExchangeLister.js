import React, { Component } from 'react'
import { memo } from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExchangeCard from './ExchangeCard';

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    crypto: "/crypto/exchange",
    forex: "/forex/exchange",
    token: "?token=c1mrjdi37fktai5sgaog"
  }

function ExchangeLister () {
     const { exchange } = useParams()
     const [forexList, setForexList] = useState([])
     const [forexIsDownloaded, setForexIsDownloaded] = useState(false)
     const [cryptoList, setCryptoList] = useState([])
     const [cryptoIsDownloaded, setCryptoIsDownloaded] = useState(false)
     
     const forexUrl = `${apiUrlParts.base}${apiUrlParts.forex}${apiUrlParts.token}`
     const cryptoUrl = `${apiUrlParts.base}${apiUrlParts.crypto}${apiUrlParts.token}`


     const fetchData = async () => {
        await axios.get(forexUrl)
           .then(response => {
               setForexList(response.data)
               setForexIsDownloaded(true)
               return response.data
           })
           .catch(error => {console.log(error) })

           await axios.get(cryptoUrl)
           .then(response => {
               setCryptoList(response.data)
               setCryptoIsDownloaded(true)
               return response.data
           })
           .catch(error => {console.log(error) })   
    }

     useEffect(()=>{
         console.log("didmount ExchangeLister")
         fetchData()
         
     },[])

     const createList = () => {
      return createExchangeCards(exchange == "forex" ? forexList : cryptoList )
     }

     const createExchangeCards = (listToDisplay) => {
        return listToDisplay.map(
          exchangeItem => <ExchangeCard key={exchangeItem} exchangeName={exchangeItem} exchangeType={exchange}/>
      )
     }

     useEffect(() => {

    })

     useEffect(() => {
         return () => {
            console.log("unmount")
         }
     }, [])

  return (  
    <div>
    <h1>{exchange}</h1>
    {forexIsDownloaded && cryptoIsDownloaded ? 
      createList() : "Downloading list..."}
    </div>
  )
}

export default React.memo(ExchangeLister)

