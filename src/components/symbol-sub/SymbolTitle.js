import React from 'react'

function SymbolTitle(props) {
    return (
    <div>
        <div className='gridContainer leftAlignedInfo'>
            <div>
                <img src={props.companyData.logo} alt={props.companyData.company} className='companyLogo' />
            </div>
            <div>
                <h1>{props.companyData.company}</h1>
                <h2>{props.companyData.name}</h2>
                <a href={props.companyData.weburl} target="_blank" >{props.companyData.weburl}</a>
            </div>

        </div>
    </div>

    )
}

export default SymbolTitle