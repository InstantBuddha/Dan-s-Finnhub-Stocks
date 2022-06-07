import React, { Component } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    crypto: "/crypto/exchange",
    forex: "/forex/exchange",
    token: "?token=c1mrjdi37fktai5sgaog"
  }

 function ExchangeLister () {
     const { exchange } = useParams()
     const [isListDownloaded, setIsListDownloaded] = useState(false)
     const [exchangeList, setExchangeList] = useState([])
     const [apiUrl, setApiUrl] = useState(`${apiUrlParts.base}${apiUrlParts[exchange]}${apiUrlParts.token}`)
     //const apiUrl = `${apiUrlParts.base}${apiUrlParts[exchange]}${apiUrlParts.token}`

     const fetchData = async (apiUrl) => {
        await axios.get(apiUrl)
           .then(response => {
               setIsListDownloaded(true)
               console.log(response)
               setExchangeList(response.data)
           })
           .catch(error => {console.log(error) })
    }

     useEffect(()=>{
         console.log("didmount")   
         fetchData(apiUrl)
     },[])

     const exchangePs = exchangeList.map(
         exchange => <p key={exchange}>{exchange}</p>
     )

     useEffect(() => {
        console.log("componentDidUpdate")
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
    exchangePs : "Downloading list..."}
    </div>
  )
}
export default React.memo(ExchangeLister)

