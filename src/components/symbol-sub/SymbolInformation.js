import React from 'react'

 function SymbolInformation(props) {
  return (
    <div>
        <div className='symbolSubGridItem'>
                <div className='gridContainer leftAlignedInfo'>
                    <div>
                        <img src={props.companyData.logo} alt={props.companyData.company} className='companyLogo'/>
                    </div>
                    <div>
                        <h1>{props.companyData.company}</h1>
                        <h2>{props.companyData.name}</h2>
                        <a href={props.companyData.weburl} target="_blank" >{props.companyData.weburl}</a>
                    </div>
                    
                </div>
                <div>
                    <div className='leftAlignedInfo'>
                        <p>Country: {props.companyData.country}</p>
                        <p>Currency: {props.companyData.currency}</p>
                        <p>Exchange: {props.companyData.exchange}</p>
                        <p>Industry: {props.companyData.finnhubIndustry}</p>
                        <p>IPO: {props.companyData.ipo}</p>
                        <p>Share outsanding: {props.companyData.shareOutstanding}</p>
                    </div>
                    
                </div>
            </div>
    </div>
  )
}

export default SymbolInformation