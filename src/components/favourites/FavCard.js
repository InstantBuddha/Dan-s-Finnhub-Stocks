import React from "react";
import { useState, useEffect } from "react";
import {
  fetchCompanyDetails,
  fetchCompanyQuote,
} from "../../services/StockApiService";
import { deleteFromFavourites } from "../../utils/UseLocalStorage";
import FavCardContent from "./FavCardContent";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { ReactComponent as Spinner } from "../../assets/svg/spinner.svg";

function FavCard(props) {
  const [companyData, setCompanyData] = useState({});
  const [quoteData, setQuoteData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const companyResponse = await fetchCompanyDetails(props.symbol, {
          signal: abortController.signal,
        });
        setCompanyData(companyResponse.data);

        const quoteResponse = await fetchCompanyQuote(props.symbol, {
          signal: abortController.signal,
        });
        setQuoteData(quoteResponse.data);
      } catch (error) {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [props.symbol]);

  const onDelete = () => {
    deleteFromFavourites(props.symbol);
    props.updateFavList();
  };

  return (
    <div className="favCard">
      {companyData.name && quoteData.c ? (
        <div>
          <FavCardContent
            logo={companyData.logo}
            key={props.symbol}
            symbol={props.symbol}
            name={companyData.name}
            price={quoteData.c}
            currency={companyData.currency}
            change={quoteData.dp}
            onDelete={onDelete}
          />
          <button className="favButton" onClick={onDelete} title="Delete item">
            <TrashIcon className="smallIcon" />
          </button>
        </div>
      ) : (
        <Spinner className="spinner spinner-small" />
      )}
    </div>
  );
}

export default FavCard;
