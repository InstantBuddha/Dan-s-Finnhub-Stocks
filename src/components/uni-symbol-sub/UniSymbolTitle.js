import React from 'react'

function UniSymbolTitle(props) {
    return (
    <div>
        <div className='gridContainer leftAlignedInfo'>
            <div>
                <img src={""} alt={props.symbol} className='companyLogo' />
            </div>
            <div>
                <h1>{props.symbol}</h1>
                
            </div>

        </div>
    </div>

    )
}

export default UniSymbolTitle