import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import LastPriceCard from './LastPriceCard'

const directions = {
    increase: "increase",
    decrease: "decrease",
    noChange: "noChange"
}

function LastPrice(props) {

    const { symbol } = useParams()  //ez azért ilyen, hogy link is legyen
    const socketData = {
        url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
        subscribeJSON: { 'type': 'subscribe', 'symbol': symbol },
        unsubscribeJSON: { 'type': 'unsubscribe', 'symbol': symbol }
    }

    const [prices, setPrices] = useState({
        newPrice: props?.lastKnownPrice,
        oldPrice: props?.lastKnownPrice,
        changeDirection: directions.noChange
    })
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
                if (tempData.type !== "ping") {
                    setPrices(prevPrices=>{
                        return {
                            newPrice: tempData.data[0].p,
                            oldPrice: prevPrices.newPrice,
                            changeDirection: newPriceChangeDirection(tempData.data[0].p, prevPrices.newPrice)
                        }
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
        })

    }, [])

    const newPriceChangeDirection = (newPrice, oldPrice)=>{
        if(newPrice > oldPrice){return directions.increase}
        if(newPrice < oldPrice){return directions.decrease}
        return directions.noChange
    }


    useEffect(() => {
        return () => {
            //this is for componentWillUnmount
            socket.current.send(JSON.stringify(socketData.unsubscribeJSON))
            socket.current.close()
        }
    }, [])

    console.log(prices)
    return (
        <div> 
            <LastPriceCard lastPrice={prices.newPrice}
                currency={props.currency}
                priceChangeDirection={prices.changeDirection} />
        </div>
    )
}

export default LastPrice