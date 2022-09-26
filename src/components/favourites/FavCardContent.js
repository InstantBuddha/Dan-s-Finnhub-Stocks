import React from 'react'
import {changeSymbols} from '../../utils/Constants'

function FavCardContent(props) {
  const changeSymbol = ()=>{
    if (props.change > 0) {return changeSymbols.increase}
    if (props.change < 0) {return changeSymbols.decrease}
    return changeSymbols.noChange
  }  

  return (
    <div className='gridContainer leftAlignedInfo'>
            <div>
                <img src={props.logo} 
                     alt={props.company} 
                     className='companyLogo' />
            </div>
            <div>
                <h2>{props.name}</h2>
                <h3>{props.price} {props.currency}</h3>
                <div>
                    <p> {props.change} % </p> {changeSymbol()}
                </div>
                              
            </div>

        </div>
  )
}

export default React.memo(FavCardContent)