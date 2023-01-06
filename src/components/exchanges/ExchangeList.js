import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExchangeCard from "./ExchangeCard";
import { fetchExchange } from "../../services/StockApiService";

function ExchangeList() {
  const { exchange } = useParams();
  const [isListDownloaded, setIsListDownloaded] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [presentExchange, setPresentExchange] = useState();

  const fetchData = async () => {
    await fetchExchange(exchange)
      .then((response) => {
        const sortedExchangeList = response.data.sort((a, b) => {
          return a.localeCompare(b);
        });
        setExchangeList(sortedExchangeList);
        setPresentExchange(exchange);
        setIsListDownloaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    exchange !== presentExchange && fetchData();
  }, [exchange, presentExchange]);

  const exchangeDisplayList = exchangeList.map((exchangeItem) => (
    <ExchangeCard
      key={exchangeItem}
      exchangeName={exchangeItem}
      exchangeType={exchange}
    />
  ));

  return (
    <div className="centerWrapper">
      {isListDownloaded ? exchangeDisplayList : "Downloading list..."}
    </div>
  );
}

export default React.memo(ExchangeList);
