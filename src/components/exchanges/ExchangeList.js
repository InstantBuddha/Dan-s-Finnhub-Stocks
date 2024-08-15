import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ExchangeCard from "./ExchangeCard";
import { fetchExchange } from "../../services/StockApiService";
import { ReactComponent as Spinner } from "../../assets/svg/spinner.svg";
import ErrorScreen from "../ErrorScreen";

function ExchangeList() {
  const { exchange } = useParams();
  const [isListDownloaded, setIsListDownloaded] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [presentExchange, setPresentExchange] = useState();
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();

    try {
      const response = await fetchExchange(exchange, {
        signal: abortController.signal,
      });
      const sortedExchangeList = response.data.sort((a, b) => {
        return a.localeCompare(b);
      });
      setExchangeList(sortedExchangeList);
      setPresentExchange(exchange);
      setIsListDownloaded(true);
    } catch (error) {
      if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
        setError("Failed to load data. Please try again.");
      }
      console.log(error);
    }

    return () => abortController.abort();
  }, [exchange]);

  const unmountCleanup = () => {
    setError(null);
    setIsListDownloaded(false);
  };

  const handleErrorReload = () => {
    unmountCleanup();
    fetchData();
  };

  useEffect(() => {
    if (exchange !== presentExchange) {
      setIsListDownloaded(false);
    }
    fetchData();
    return () => unmountCleanup();
  }, [exchange, fetchData]);

  if (error) {
    return (
      <ErrorScreen errorMessage={error} handleErrorReload={handleErrorReload} />
    );
  }

  const exchangeDisplayList = exchangeList.map((exchangeItem) => (
    <ExchangeCard
      key={exchangeItem}
      exchangeName={exchangeItem}
      exchangeType={exchange}
    />
  ));

  return (
    <div className="centerWrapper">
      {isListDownloaded ? exchangeDisplayList : <Spinner className="spinner" />}
    </div>
  );
}

export default React.memo(ExchangeList);
