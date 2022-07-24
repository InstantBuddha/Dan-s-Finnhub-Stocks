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

    const [newPriceSaved, setNewPriceSaved] = useState(props?.lastKnownPrice)
    const [oldPriceSaved, setOldPriceSaved] = useState(props?.lastKnownPrice)
    const [changeDirection, setChangeDirection] = useState(directions.noChange)
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
                    setNewPriceSaved(tempData.data[0].p)
                    setChangeDirection(newPriceChangeDirection(tempData.data[0].p, oldPriceSaved))
                    setOldPriceSaved(tempData.data[0].p)
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

    
    return (
        <div> 
            <LastPriceCard lastPrice={newPriceSaved}
                currency={props.currency}
                priceChangeDirection={changeDirection} />
        </div>
    )
}

export default LastPrice