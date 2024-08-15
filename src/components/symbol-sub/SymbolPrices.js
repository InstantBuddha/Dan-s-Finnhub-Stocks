import React from "react";
import { useState, useEffect } from "react";
import LastPrice from "./realtime-data/LastPrice";
import { fetchCompanyQuote } from "../../services/StockApiService";
import { ReactComponent as Spinner } from "../../assets/svg/spinner.svg";

function SymbolPrices(props) {
  const [priceData, setPriceData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetchCompanyQuote(props.company, {
          signal: abortController.signal,
        });
        setPriceData(response.data);
      } catch (error) {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          setError("Failed to load data. Please try again.");
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [props.company]);

  const textToDisplay = [
    `Change: ${priceData.d} ${props.currency}`,
    `High price of the day: ${priceData.h} ${props.currency}`,
    `Low price of the day: ${priceData.l} ${props.currency}`,
    `Open price of the day: ${priceData.o} ${props.currency}`,
    `Previous close price: ${priceData.pc} ${props.currency}`,
  ];

  if (isLoading) {
    return (
      <div>
        <Spinner className="spinner" />
      </div>
    );
  }

  if (error) {
    return <div className="error-screen">Error loading price data.</div>;
  }

  return (
    <div className="symbolSubGridItem leftAlignedInfo">
      <LastPrice lastKnownPrice={priceData.c} currency={props.currency} />

      {textToDisplay.map((textItem) => (
        <p key={textItem}>{textItem}</p>
      ))}
    </div>
  );
}

export default SymbolPrices;
