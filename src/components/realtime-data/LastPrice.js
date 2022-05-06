import React from 'react'
import { useState, useEffect, useRef } from "react"

function LastPrice(props) {

    const [stockData, setStockData] = useState({})
    const socket = useRef()
    //now it is for binance for testing!!!!!!!!!!!!!!
    const socketData = {
        url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
        subscribeJSON: { 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' },
        unsubscribeJSON: { 'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT' }
    }

    useEffect( () => {
        //this is for componentDidMount
        socket.current = new WebSocket(socketData.url)
        socket.current.addEventListener("open", (event)=>{
            socket.current.send(JSON.stringify(socketData.subscribeJSON))
        })
        socket.current.addEventListener("message", (event)=>{
            try {
                const tempData = JSON.parse(event.data)
                setStockData(tempData.data[0])
            } catch(error){
                console.log(error)
            }
        })

    }, [])

    useEffect( () => {
        return () => {
            //this is for componentWillUnmount
            socket.current.send(JSON.stringify(socketData.unsubscribeJSON))
            socket.current.close()
        }
    }, [])

    return (
        <div>
        <h1>Last price:</h1>
        <h1>{stockData.p ? stockData.p : "Downloading data..."}</h1>
        </div>
    )
}

export default LastPrice