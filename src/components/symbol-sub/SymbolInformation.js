import React from 'react'

function SymbolInformation(props) {
  const textToDisplay = [`Country: ${props.companyData.country}`,
  `Currency: ${props.companyData.currency}`,
  `Exchange: ${props.companyData.exchange}`,
  `Industry: ${props.companyData.finnhubIndustry}`,
  `IPO: ${props.companyData.ipo}`,
  `Share outsanding: ${props.companyData.shareOutstanding}`]

  return (
    <div>
      <div className='symbolSubGridItem'>
        <div>
          <div className='leftAlignedInfo'>
            {textToDisplay.map(
              textItem => <p key={textItem}>{textItem}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymbolInformation