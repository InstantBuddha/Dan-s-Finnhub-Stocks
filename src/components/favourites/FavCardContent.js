import React from "react";
import { changeSymbols } from "../../utils/Constants";
import { Link } from "react-router-dom";

function FavCardContent(props) {
  const changeSymbol = () => {
    if (props.change > 0) {
      return changeSymbols.increase;
    }
    if (props.change < 0) {
      return changeSymbols.decrease;
    }
    return changeSymbols.noChange;
  };

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
          <div className='favCompInfo'><p>{props.change}%  </p></div>
          <div className='favCompInfo'>{changeSymbol()}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FavCardContent);
