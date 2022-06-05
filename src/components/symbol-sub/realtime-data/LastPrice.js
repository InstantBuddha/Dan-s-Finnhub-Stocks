import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import LastPriceCard from './LastPriceCard'

const changeSymbols = {
    increase: <p>&#9650;</p>,
    decrease: <p>&#9660;</p>,
    noChange: <p> </p>
}

function LastPrice(props) {

    const { symbol } = useParams()  //ez azért ilyen, hogy link is legyen
    const socketData = {
        url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
        subscribeJSON: { 'type': 'subscribe', 'symbol': symbol },
        unsubscribeJSON: { 'type': 'unsubscribe', 'symbol': symbol }
    }

    const [stockData, setStockData] = useState({})
    const [prices, setPrices] = useState({newPrice: props.lastKnownPrice,
                                          oldPrice: props.lastKnownPrice})
    const [priceChangeDirection, setPriceChangeDirection] = useState(changeSymbols.noChange)
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
                if (tempData.type == "ping") {
                    console.log("it's a ping baby")
                } else {
                    setPrices(previousState => {
                        return {...previousState, newPrice: tempData.data[0].p, oldPrice: previousState.newPrice}
                    })

                    setPriceChangeDirection(()=>{
                        if( prices.newPrice == prices.oldPrice ){
                            return changeSymbols.noChange
                        }
                        return prices.newPrice < prices.oldPrice ? changeSymbols.decrease : changeSymbols.increase
                    })
                }


            } catch (error) {
                console.log(error)
            }
        })

    }, [])

    const updatePrices = () =>{

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
        {priceChangeDirection}         
            <LastPriceCard lastPrice={prices.newPrice}
                currency={props.currency}
                priceChangeDirection={priceChangeDirection} />
        </div>
    )
}

export default LastPrice