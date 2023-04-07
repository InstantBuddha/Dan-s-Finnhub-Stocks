import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SymbolInformation from "./SymbolInformation";
import SymbolPrices from "./SymbolPrices";
import SymbolTitle from "./SymbolTitle";
import { fetchCompanyDetails } from "../../services/StockApiService";
import { addToLocalStorage, isAlreadyAdded } from "../../utils/UseLocalStorage";
import { favTypes } from "../../utils/Constants";
import { ReactComponent as AddIcon } from "../../assets/svg/add.svg";
import { ReactComponent as AddedIcon } from "../../assets/svg/added.svg";
import { ReactComponent as Spinner } from "../../assets/svg/spinner.svg";

function SymbolScreen() {
  const { symbol } = useParams();
  const [isCompanyDataDownloaded, setIsCompanyDataDownloaded] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [isCompanyFav, setIsCompanyFav] = useState(
    isAlreadyAdded({ symbol: symbol })
  );

  const fetchData = async () => {
    await fetchCompanyDetails(symbol)
      .then((response) => {
        setCompanyData(response.data);
        if (response.data.name) {
          setIsCompanyDataDownloaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddButton = () => {
    addToLocalStorage({ symbol: symbol, type: favTypes.company });
    setIsCompanyFav(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(isAlreadyAdded({ symbol: symbol }));
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
        <Spinner className="spinner"/>
      )}
    </div>
  );
}

export default SymbolScreen;
