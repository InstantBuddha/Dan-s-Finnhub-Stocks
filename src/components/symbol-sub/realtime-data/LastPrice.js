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

    const [newPrice, setNewPrice] = useState(props.lastKnownPrice)
    const [oldPrice, setOldPrice] = useState(props.lastKnownPrice)
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
                    setOldPrice(newPrice)
                    console.log(oldPrice)
                    setNewPrice(tempData.data[0].p)
                    console.log(newPrice)
                    setChangeDirection(newPriceChangeDirection())
                }
                
            } catch (error) {
                console.log(error)
            }
        })

    }, [])

    const newPriceChangeDirection = ()=>{
        console.log(newPrice, oldPrice)
        if( newPrice == oldPrice ){
            console.log("noChange return")
            return directions.noChange
        }
        return newPrice < oldPrice ? directions.decrease : directions.increase
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
            <LastPriceCard lastPrice={newPrice}
                currency={props.currency}
                priceChangeDirection={changeDirection} />
        </div>
    )
}

export default LastPrice