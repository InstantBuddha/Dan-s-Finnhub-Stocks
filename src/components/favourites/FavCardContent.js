import React from "react";
import { changeSymbols } from "../../utils/Constants";
import { Link } from "react-router-dom";

function FavCardContent(props) {
  const changeSymbol = () => (
    props.change > 0
      ? "increase"
      : props.change < 0
      ? "decrease"
      : "noChange"
  );

  return (
    <div className='favContentWrapper leftAlignedInfo'>
      <div>
        <img src={props.logo}
          alt={props.company}
          className='favCompLogo' />
      </div>
      <div className='favCompInfo'>
        <Link to={`/stock-market/US/${props.symbol}`} 
              className="favCompInfo favCompLink"
              title="Open Datasheet" >{props.name}</Link>
        <h3 className='favCompInfo'>{props.price} {props.currency}</h3>
        <div className='favContentWrapper favCompInfo'>
          <p className={changeSymbol()}>{`${props.change}% ${changeSymbols[changeSymbol()]}`}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FavCardContent);
