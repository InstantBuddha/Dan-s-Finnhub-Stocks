export const directions = {
  increase: "increase",
  decrease: "decrease",
  noChange: "noChange",
};

export const changeSymbols = {
  increase: "▲",
  decrease: "▼",
  noChange: "",
};

export const favTypes = {
  company: "company",
  crypto: "crypto",
  forex: "forex",
};

export const defaultFavList = [
  { symbol: "TSLA", type: favTypes.company },
  { symbol: "AAPL", type: favTypes.company },
  { symbol: "MSFT", type: favTypes.company },
  { symbol: "GOOGL", type: favTypes.company },
];
