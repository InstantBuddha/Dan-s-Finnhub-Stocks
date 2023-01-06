import React from "react";
import { useState, useEffect } from "react";
import {
  fetchCompanyDetails,
  fetchCompanyQuote,
} from "../../services/StockApiService";
import { deleteFromFavourites } from "../../utils/UseLocalStorage";
import FavCardContent from "./FavCardContent";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";

function FavCard(props) {
  const [companyData, setCompanyData] = useState({});
  const [quoteData, setQuoteData] = useState({});

  const fetchData = async () => {
    await fetchCompanyDetails(props.symbol)
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchQuoteData = async () => {
    await fetchCompanyQuote(props.symbol)
      .then((response) => {
        setQuoteData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchQuoteData();
  }, []);

  const onDelete = () => {
    deleteFromFavourites(props.symbol);
    props.updateFavList();
  };

  return (
    <div className="favCard">
      {companyData.name && quoteData.c ? (
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
      ) : (
        <p>Downloading data for {props.symbol}</p>
      )}
      <button className="favButton" onClick={onDelete} title="Delete item">
        <TrashIcon className="smallIcon" />
      </button>
    </div>
  );
}

export default FavCard;
