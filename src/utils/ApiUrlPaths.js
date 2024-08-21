const base = "https://finnhub.io/api/v1";
export const token = process.env.REACT_APP_API_KEY;

export const paths = {
  companyDetails: `${base}/stock/profile2`,
  exchangeListerTypes: {
    crypto: `${base}/crypto/exchange`,
    forex: `${base}/forex/exchange`,
  },
  symbolListerTypes: {
    "stock-market": `${base}/stock/symbol`,
    crypto: `${base}/crypto/symbol`,
    forex: `${base}/forex/symbol`,
  },
  quoteSymbol: `${base}/quote`,
};

export const socketUrl = `wss://ws.finnhub.io?token=${token}`;
