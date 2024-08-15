import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SymbolInformation from "./SymbolInformation";
import SymbolPrices from "./SymbolPrices";
import SymbolTitle from "./SymbolTitle";
import { fetchCompanyDetails } from "../../services/StockApiService";
import {
  addToLocalStorage,
  deleteFromFavourites,
  isAlreadyAdded,
} from "../../utils/UseLocalStorage";
import { favTypes } from "../../utils/Constants";
import { ReactComponent as AddIcon } from "../../assets/svg/add.svg";
import { ReactComponent as AddedIcon } from "../../assets/svg/added.svg";
import { ReactComponent as Spinner } from "../../assets/svg/spinner.svg";
import ErrorScreen from "../ErrorScreen";

function SymbolScreen() {
  const { symbol } = useParams();
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [isCompanyFav, setIsCompanyFav] = useState(
    isAlreadyAdded({ symbol: symbol })
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetchCompanyDetails(symbol, {
          signal: abortController.signal,
        });
        setCompanyData(response.data);
        if (response.data.name) {
          setIsCompanyDataDownloaded(true);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          setError("Failed to load company data. Please try again.");
        }
        console.log(error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [symbol]);

  const handleAddButton = () => {
    isCompanyFav
      ? deleteFromFavourites(symbol)
      : addToLocalStorage({ symbol: symbol, type: favTypes.company });

    setIsCompanyFav(!isCompanyFav);
  };

  if (error) {
    return <ErrorScreen errorMessage={error} />;
  }

  return (
    <div className="centerWrapper">
      {isCompanyDataDownloaded ? (
        <div>
          <SymbolTitle companyData={companyData} />
          <div className="gridContainer responsiveGrid">
            <SymbolInformation companyData={companyData} />
            <SymbolPrices company={symbol} currency={companyData.currency} />
          </div>
          <button
            className="addButton"
            onClick={handleAddButton}
            title="Add to favourites"
          >
            {isCompanyFav ? (
              <AddedIcon className="addIcon" />
            ) : (
              <AddIcon className="addIcon" />
            )}
          </button>
        </div>
      ) : (
        <Spinner className="spinner" />
      )}
    </div>
  );
}

export default SymbolScreen;
