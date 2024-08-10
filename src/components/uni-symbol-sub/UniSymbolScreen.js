import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UniSymbolTitle from "./UniSymbolTitle";
import { directions } from "../../utils/Constants";
import UniLastPriceCard from "./UniLastPriceCard";
import { priceChangeDirection } from "../../utils/StockUtils";

function UniSymbolScreen() {
  const { symbol } = useParams();
  const [dataDownloaded, setDataDownloaded] = useState(false);

  const socketData = {
    url: "wss://ws.finnhub.io?token=c1mrjdi37fktai5sgaog",
    subscribeJSON: { type: "subscribe", symbol: symbol },
    unsubscribeJSON: { type: "unsubscribe", symbol: symbol },
  };

  const [prices, setPrices] = useState({
    newPrice: 1,
    oldPrice: 1,
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
          console.log(tempData.data[0].p);
          setPrices((prevPrices) => ({
            newPrice: tempData.data[0].p,
            oldPrice: prevPrices.newPrice,
            changeDirection: priceChangeDirection(
              tempData.data[0].p,
              prevPrices.newPrice
            ),
          }));
          setDataDownloaded(true);
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
    <div className="centerWrapper">
      <UniSymbolTitle symbol={symbol} />
      {dataDownloaded ? (
        <UniLastPriceCard
          lastPrice={prices.newPrice}
          priceChangeDirection={prices.changeDirection}
        />
      ) : (
        <p>Data becomes available at first price change</p>
      )}
      <div className="gridContainer responsiveGrid"></div>
    </div>
  );
}

export default UniSymbolScreen;
