import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { directions } from "../../../utils/Constants";
import { priceChangeDirection } from "../../../utils/StockUtils";
import UniLastPriceCard from "../../uni-symbol-sub/UniLastPriceCard";

function LastPrice(props) {
  const { symbol } = useParams();
  const socketData = {
    url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
    subscribeJSON: { type: "subscribe", symbol: symbol },
    unsubscribeJSON: { type: "unsubscribe", symbol: symbol },
  };

  const [prices, setPrices] = useState({
    newPrice: props?.lastKnownPrice,
    oldPrice: props?.lastKnownPrice,
    changeDirection: directions.noChange,
  });

  useEffect(() => {
    const socket = new WebSocket(socketData.url);
    socket.addEventListener("open", (event) => {
      socket.send(JSON.stringify(socketData.subscribeJSON));
    });
    socket.addEventListener("message", (event) => {
      try {
        const tempData = JSON.parse(event.data);
        if (tempData.type !== "ping") {
          setPrices((prevPrices) => ({
            newPrice: tempData.data[0].p,
            oldPrice: prevPrices.newPrice,
            changeDirection: priceChangeDirection(
              tempData.data[0].p,
              prevPrices.newPrice
            ),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    });

    // Cleanup function to close connection on unmount
    return () => {
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(socketData.unsubscribeJSON));
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <UniLastPriceCard
        lastPrice={prices.newPrice}
        currency={props.currency}
        priceChangeDirection={prices.changeDirection}
      />
    </div>
  );
}

export default LastPrice;
