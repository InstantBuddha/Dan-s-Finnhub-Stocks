import { paths, token } from "../utils/ApiUrlPaths";
import axios from "axios";

export async function fetchCompanyDetails(symbol) {
    function companyDetailsParams(symbol) {
        return {
            symbol: symbol,
            token: token
        }
    }

    const params = companyDetailsParams(symbol)
    return axios.get(paths.companyDetails, {params: params})
}