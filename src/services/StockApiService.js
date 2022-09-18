import { paths, token } from "../utils/ApiUrlPaths";
import axios from "axios";

const tokenParam = {token: token}

export async function fetchCompanyDetails(symbol) {
    let params = tokenParam
    params.symbol = symbol
    return axios.get(paths.companyDetails, {params: params})
}

export async function fetchCompanyQuote(company){
    let params = tokenParam
    params.symbol = company
    return axios.get(paths.quoteSymbol, {params: params})
}

/*export async function fetchStockExchange(country){
    let params = tokenParam
    params.exchange = country
    return axios.get(paths.stockSymbols, {params: params})
}*/

export async function fetchExchange(exchangeType){
    let params = tokenParam
    return axios.get(paths.exchangeListerTypes[exchangeType], {params: params})
}

export async function fetchUniversalMarket(exchangeType, market){
    let params = tokenParam
    params.exchange = market
    return axios.get(paths.symbolListerTypes[exchangeType], {params: params})
}