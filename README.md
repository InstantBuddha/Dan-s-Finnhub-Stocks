#Dan's Finnhub Lister React app

This app was created to showcase my practical knowledge of React and other technologies. I focus on writing clean and concise code.

##Overview

Presently three subpages are available from the NavBar:
- From the Stock Exchange page a searchable, paginated list appears of traded stocks. They are downloaded using the Finnhub API, via Axios
 - A datasheet can be reached for each stock listed, displaying information such as the company logo, high and low prices of the day and during stock market opening hours a real time display of trading price and it's changing direction.
- The Crypto and Forex pages display all markets available on Finnhub. By clicking on a market, all the traded crypto or forex currencies can be reached with live data on current price and price change direction showed.

##Technologies used

- React
- React Router
- Axios for get requests
- Websockets
- Responsive CSS