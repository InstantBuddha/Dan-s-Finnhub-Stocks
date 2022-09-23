import React from 'react'
import { favTypes } from '../../utils/Constants'
import FavCard from './FavCard'

const defaultFavList = [
    {symbol: "TSLA", type: favTypes.company},
    {symbol: "APPL", type: favTypes.company}
]

const displayFavList = (listToDisplay) =>{
  return listToDisplay.map(
    favItem => <FavCard symbol={favItem.symbol}/>
  )
}
export default function FavList() {
  return (
    <div>{displayFavList(defaultFavList)}</div>
  )
}
