import React from 'react'
import { changeSymbols } from '../../utils/Constants'

function UniLastPriceCard(props) {
    return (
        <div className='gridContainer responsiveGrid'>
            <div>
                <p className='importantText'>{props.lastPrice} {props.currency} </p>
            </div>
            <div>
                {changeSymbols[props.priceChangeDirection]}
            </div>
        </div>
    )
}

export default UniLastPriceCard