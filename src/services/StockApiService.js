import { paths, token } from "../utils/ApiUrlPaths";
import axios from "axios";

const tokenParam = { token: token };

export async function fetchCompanyDetails(symbol, options = {}) {
  let params = { ...tokenParam, symbol: symbol };
  return axios.get(paths.companyDetails, { params: params, ...options });
}

export async function fetchCompanyQuote(company, options = {}) {
  let params = { ...tokenParam, symbol: company };
  return axios.get(paths.quoteSymbol, { params: params, ...options });
}

export async function fetchExchange(exchangeType, options = {}) {
  let params = { ...tokenParam };
  return axios.get(paths.exchangeListerTypes[exchangeType], {
    params: params,
    ...options,
  });
}

export async function fetchUniversalMarket(exchangeType, market, options = {}) {
  let params = { ...tokenParam, exchange: market };

  return axios.get(paths.symbolListerTypes[exchangeType], {
    params: params,
    ...options,
  });
}
