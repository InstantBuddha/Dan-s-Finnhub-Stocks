import React, { useState } from 'react'
import { getFromLocalStorage } from '../../utils/UseLocalStorage'
import FavCard from './FavCard'

export default function FavList() {
  const [favouritesList, setFavouritesList] = useState(getFromLocalStorage)

  const displayFavList = (listToDisplay) =>{
    return listToDisplay.map(
      favItem => <FavCard 
                    key={favItem.symbol}
                    symbol={favItem.symbol}/>
    )
  }

  return (
    <div className='favList'>{displayFavList(favouritesList)}</div>
  )
}
