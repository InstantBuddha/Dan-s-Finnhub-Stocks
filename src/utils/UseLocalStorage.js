import { favTypes } from "./Constants"

const defaultFavList = [
    { symbol: "TSLA", type: favTypes.company },
    { symbol: "AAPL", type: favTypes.company }
]

export const getFromLocalStorage = () => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"))
    if (!storedFavourites) { return defaultFavList }
    return storedFavourites
}

export const addToLocalStorage = (itemToAdd) => {
    if(!isItemThere(itemToAdd)){
        let favouritesString = getFromLocalStorage().concat(itemToAdd)
        localStorage.setItem("favourites", JSON.stringify(favouritesString))
    }
    
}

const isItemThere = (itemToCheck) => {
    return getFromLocalStorage().find( item =>{return item.symbol === itemToCheck.symbol})
}

export const deleteFromFavourites = (itemToRemove) => {
    function removeItem(){
        return getFromLocalStorage().filter((obj) => obj.symbol !== itemToRemove)
    }
    localStorage.setItem("favourites", JSON.stringify(removeItem()))
}

