import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { directions } from "../../../utils/Constants";
import { priceChangeDirection } from "../../../utils/StockUtils";
import UniLastPriceCard from "../../uni-symbol-sub/UniLastPriceCard";
import { socketUrl } from "../../../utils/ApiUrlPaths";

function LastPrice(props) {
  const { symbol } = useParams();

  const socketData = {
    url: socketUrl,
    subscribeJSON: { type: "subscribe", symbol: symbol },
    unsubscribeJSON: { type: "unsubscribe", symbol: symbol },
  };

  const socket = useRef(null);

  const [prices, setPrices] = useState({
    newPrice: props?.lastKnownPrice,
    oldPrice: props?.lastKnownPrice,
    changeDirection: directions.noChange,
  });

  useEffect(() => {
    socket.current = new WebSocket(socketData.url);
    socket.current.addEventListener("open", (event) => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(socketData.subscribeJSON));
      }
    });

    socket.current.addEventListener("message", (event) => {
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

    socket.current.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.current.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });

    return () => {
      if (socket.current) {
        if (socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(socketData.unsubscribeJSON));
        }
        socket.current.close();
      }
    };
  }, [symbol]);

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
