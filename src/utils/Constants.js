export const directions = {
    increase: "increase",
    decrease: "decrease",
    noChange: "noChange"
}

export const changeSymbols = {
    increase: <p style={{color: "green"}}>&#9650;</p>,
    decrease: <p style={{color: "red"}}>&#9660;</p>,
    noChange: <p> </p>
  }

export const favTypes = {
    company: "company",
    crypto: "crypto",
    forex: "forex"
}  

export const defaultFavList = [
    { symbol: "TSLA", type: favTypes.company },
    { symbol: "AAPL", type: favTypes.company },
    { symbol: "MSFT", type: favTypes.company },
    { symbol: "GOOGL", type: favTypes.company }
]
