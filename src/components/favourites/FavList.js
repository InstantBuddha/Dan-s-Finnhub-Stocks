import React from 'react'
import { favTypes } from '../../utils/Constants'
import FavCard from './FavCard'

const defaultFavList = [
    {symbol: "TSLA", type: favTypes.company},
    {symbol: "AAPL", type: favTypes.company}
]

const displayFavList = (listToDisplay) =>{
  return listToDisplay.map(
    favItem => <FavCard 
                  key={favItem.symbol}
                  symbol={favItem.symbol}/>
  )
}
export default function FavList() {
  return (
    <div className='favList'>{displayFavList(defaultFavList)}</div>
  )
}
