export function updateSearchResults(searchTerm, stockData) {
    return stockData.filter(stockObject => {
        return isTermIncluded(searchTerm, [stockObject.symbol, stockObject.description])
    })
}

const isTermIncluded = (searchTerm, valuesToCheck) => {
    return valuesToCheck.some(value => {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
    })
}