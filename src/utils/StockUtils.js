import { directions } from "./Constants";

export const priceChangeDirection = (newPrice, oldPrice) =>
    newPrice > oldPrice
      ? directions.increase
      : newPrice < oldPrice
      ? directions.decrease
      : directions.noChange;