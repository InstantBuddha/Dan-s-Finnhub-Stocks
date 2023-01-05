import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import UniSymbolTitle from "./UniSymbolTitle";
import { directions } from "../../utils/Constants";
import UniLastPriceCard from "./UniLastPriceCard";

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

  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket(socketData.url);
    socket.current.addEventListener("open", (event) => {
      socket.current.send(JSON.stringify(socketData.subscribeJSON));
    });
    socket.current.addEventListener("message", (event) => {
      try {
        const tempData = JSON.parse(event.data);
        if (tempData.type !== "ping") {
          setPrices((prevPrices) => {
            return {
              newPrice: tempData.data[0].p,
              oldPrice: prevPrices.newPrice,
              changeDirection: newPriceChangeDirection(
                tempData.data[0].p,
                prevPrices.newPrice
              ),
            };
          });
          setDataDownloaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      socket.current.send(JSON.stringify(socketData.unsubscribeJSON));
      socket.current.close();
    };
  }, []);

  const newPriceChangeDirection = (newPrice, oldPrice) => {
    if (newPrice > oldPrice) {
      return directions.increase;
    }
    if (newPrice < oldPrice) {
      return directions.decrease;
    }
    return directions.noChange;
  };

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
