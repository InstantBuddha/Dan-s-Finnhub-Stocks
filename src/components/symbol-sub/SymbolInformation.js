import React from 'react'

 function SymbolInformation(props) {
  return (
    <div>
        <div className='symbolSubGridItem'>
                
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