# Dan's Finnhub Lister React app

This app was created to showcase my practical knowledge of React and other technologies. I focus on writing clean and concise code.

## Overview

Presently three subpages are available from the NavBar:

### Stock Exchange
- Here a paginated list appears of traded stocks. They are downloaded using the Finnhub API, via Axios.
- A datasheet can be reached for each stock listed, displaying information such as the company logo or high and low prices of the day. 
- During stock market opening hours a real time display of trading price and its changing direction is displayed using websockets.
- Stocks can be added as favourites, which are stored in localStorage and appear on the Home page, where they can be removed.

### Crypto and Forex
- Both pages display all markets available on Finnhub. By clicking on a market, all the traded crypto or forex currencies can be reached with live data on current price and price change direction showed using websockets.

## Technologies used

- React
- React Router
- Cookies with React localStorage
- React Hooks
- Axios for get requests
- Websockets
- Responsive CSS