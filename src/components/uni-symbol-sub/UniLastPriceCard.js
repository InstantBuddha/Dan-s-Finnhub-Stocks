import React from "react";
import { changeSymbols } from "../../utils/Constants";

function UniLastPriceCard(props) {
  return (
    <div>
      <p className="importantText">
        {props.lastPrice} {props.currency}
      </p>
      <p className={`change-symbol ${props.priceChangeDirection}`}>
        {changeSymbols[props.priceChangeDirection]}
      </p>
    </div>
  );
}

export default UniLastPriceCard;
