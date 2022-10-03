import React from 'react'
import { changeSymbols } from '../../utils/Constants'
import { deleteFromFavourites } from '../../utils/UseLocalStorage'

function FavCardContent(props) {
  const changeSymbol = () => {
    if (props.change > 0) { return changeSymbols.increase }
    if (props.change < 0) { return changeSymbols.decrease }
    return changeSymbols.noChange
  }

  return (
    <div className='favContentWrapper leftAlignedInfo'>
      <div>
        <img src={props.logo}
          alt={props.company}
          className='favCompLogo' />
      </div>
      <div className='favCompInfo'>
        <h2 className='favCompInfo'>{props.name}</h2>
        <h3 className='favCompInfo'>{props.price} {props.currency}</h3>
        <div className='favContentWrapper favCompInfo'>
          <div className='favCompInfo'><p>{props.change}%  </p></div>
          <div className='favCompInfo'>{changeSymbol()}</div>
        </div>

      </div>
      <button className='favButton' 
              onClick={props.onDelete}>R</button>
    </div>
  )
}

export default React.memo(FavCardContent)