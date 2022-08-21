export const apiUrlParts = {
    base: "https://finnhub.io/api/v1",
    stockSymbols: "/stock/symbol?exchange=",
    symbolListerTypes: {
        forex: "/forex/symbol?exchange=",
        crypto: "/crypto/symbol?exchange="
    },
    exchangeListerTypes: {
        crypto: "/crypto/exchange",
        forex: "/forex/exchange"
    },
    companyDetail: "/stock/profile2?symbol=",
    quoteSymbol: "/quote?symbol=",
    token: "&token=c1mrjdi37fktai5sgaog"
}

export const directions = {
    increase: "increase",
    decrease: "decrease",
    noChange: "noChange"
}
