import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import LastPriceCard from './LastPriceCard'

function LastPrice(props) {

    const { symbol } = useParams()  //ez azért ilyen, hogy link is legyen
    const socketData = {
        url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
        subscribeJSON: { 'type': 'subscribe', 'symbol': symbol },
        unsubscribeJSON: { 'type': 'unsubscribe', 'symbol': symbol }
    }

    const [stockData, setStockData] = useState({})
    //console.log(props) 
    const [previousPrice, setPreviousPrice] = useState(props.lastKnownPrice)    
    const [newPrice, setNewPrice] = useState(props.lastKnownPrice)
    const [priceChangeDirection, setpriceChangeDirection] = useState("no change")
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
                if(tempData.type == "ping"){
                    console.log("it's a ping baby")
                }else{
                    console.log(tempData)
                    setPreviousPrice(newPrice)
                    setNewPrice(tempData.data[0].p)
                }
                
                
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
            {stockData.p ?
                <LastPriceCard lastPrice={stockData.p}
                    timeStamp={stockData.t}
                    currency={props.currency} />
                : <p className='importantText'>{props.lastKnownPrice} {props.currency}</p>}

        </div>
    )
}

export default LastPrice