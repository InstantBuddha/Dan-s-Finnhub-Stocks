const base = "https://finnhub.io/api/v1"
export const token = "c1mrjdi37fktai5sgaog"

export const paths = {
    stockSymbols: `${base}/stock/symbol`,
    companyDetails : `${base}/stock/profile2`,
    forexSymbols: `${base}/forex/symbol`,
    cryptoSymbols: `${base}/crypto/symbol`,
    exchangeListerTypes: {
        crypto: `${base}/crypto/exchange`,
        forex: `${base}/forex/exchange`
      },quoteSymbol: `${base}/quote`
} 

