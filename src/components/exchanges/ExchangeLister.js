import React, { Component } from 'react'
import axios from 'axios'

//import { apiUrlParts } from '../../utils/Constants';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExchangeCard from './ExchangeCard';

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    exchangeListerTypes: {
      crypto: "/crypto/exchange",
      forex: "/forex/exchange"
    },
    token: "?token=c1mrjdi37fktai5sgaog"
  }

function ExchangeLister () {
     const { exchange } = useParams()
     const [isListDownloaded, setIsListDownloaded] = useState(false)
     const [exchangeList, setExchangeList] = useState([])
     const [presentExchange, setPresentExchange] = useState()
     const apiUrl = `${apiUrlParts.base}${apiUrlParts.exchangeListerTypes[exchange]}${apiUrlParts.token}`

     const fetchData = async (apiUrl) => {
        await axios.get(apiUrl)
           .then(response => {
               setIsListDownloaded(true)
               setExchangeList(response.data)
               setPresentExchange(exchange)
           })
           .catch(error => {console.log(error) })
    }

     useEffect(()=>{
         console.log("didmount")
         fetchData(apiUrl)
     },[])

     const exchangeDisplayList = exchangeList.map(
         exchangeItem => <ExchangeCard key={exchangeItem} exchangeName={exchangeItem} exchangeType={exchange}/>
     )

     useEffect(() => {
        exchange !== presentExchange && fetchData(apiUrl)
    })

     useEffect(() => {
         return () => {
            console.log("unmount")
         }
     }, [])

  return (  
    <div>
    <h1>{exchange}</h1>
    {isListDownloaded ? 
    exchangeDisplayList : "Downloading list..."}
    </div>
  )
}

export default React.memo(ExchangeLister)

