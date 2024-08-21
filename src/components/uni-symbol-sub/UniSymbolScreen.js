import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UniSymbolTitle from "./UniSymbolTitle";
import { directions } from "../../utils/Constants";
import UniLastPriceCard from "./UniLastPriceCard";
import { priceChangeDirection } from "../../utils/StockUtils";
import { socketUrl } from "../../utils/ApiUrlPaths";

function UniSymbolScreen() {
  const { symbol } = useParams();
  const [dataDownloaded, setDataDownloaded] = useState(false);

  const socketData = {
    url: socketUrl,
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

    return () => {
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(socketData.unsubscribeJSON));
        socket.close();
      }
    };
  }, []);

  return (
    <div className="centerWrapper">
      <div className="cardWrapper">
        <UniSymbolTitle symbol={symbol} />
        {dataDownloaded ? (
          <UniLastPriceCard
            lastPrice={prices.newPrice}
            priceChangeDirection={prices.changeDirection}
          />
        ) : (
          <p>
            Data becomes available at first price change, which is only provided
            by Finnhub if the market is open.
          </p>
        )}
      </div>
    </div>
  );
}

export default UniSymbolScreen;
