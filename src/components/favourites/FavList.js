import React, { useState } from 'react'
import { getFromLocalStorage } from '../../utils/UseLocalStorage'
import FavCard from './FavCard'

function FavList() {
  const [favouritesList, setFavouritesList] = useState(getFromLocalStorage)

  const updateFavList = () =>{
    setFavouritesList(getFromLocalStorage)
  }

  const displayFavList = (listToDisplay) =>{
    return listToDisplay.map(
      favItem => <FavCard 
                    key={favItem.symbol}
                    symbol={favItem.symbol}
                    updateFavList={updateFavList} />
    )
  }

  return (
    <div className='favList'>{displayFavList(favouritesList)}</div>
  )
}

export default FavList