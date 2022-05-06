import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import LastPriceCard from './LastPriceCard'

function LastPrice() {

    const { symbol } = useParams()
    const socketData = {
        url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
        subscribeJSON: { 'type': 'subscribe', 'symbol': symbol },
        unsubscribeJSON: { 'type': 'unsubscribe', 'symbol': symbol }
    }

    const [stockData, setStockData] = useState({})
    const socket = useRef()



    useEffect(() => {
        //this is for componentDidMount        
        socket.current = new WebSocket(socketData.url)
        socket.current.addEventListener("open", (event) => {
            socket.current.send(JSON.stringify(socketData.subscribeJSON))
        })
        socket.current.addEventListener("message", (event) => {
            try {
                const tempData = JSON.parse(event.data)
                console.log(tempData)
                setStockData(tempData.data[0])
            } catch (error) {
                console.log(error)
            }
        })

    }, [])

    useEffect(() => {
        return () => {
            //this is for componentWillUnmount
            socket.current.send(JSON.stringify(socketData.unsubscribeJSON))
            socket.current.close()
        }
    }, [])


    return (

        <div>
            <h1>Up to date information for { symbol }</h1>
            <h2>{stockData.p ? 
                <LastPriceCard lastPrice={stockData.p}
                               timeStamp={stockData.t} /> 
                : "Downloading data..."}</h2>
            
        </div>
    )
}

export default LastPrice