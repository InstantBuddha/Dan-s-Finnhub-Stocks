import { defaultFavList } from "./Constants"

export const getFromLocalStorage = () => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"))
    if (!storedFavourites) { return defaultFavList }
    return storedFavourites
}

export const addToLocalStorage = (itemToAdd) => {
    if (isAlreadyAdded(itemToAdd)) { return }
    let favouritesString = getFromLocalStorage().concat(itemToAdd)
    localStorage.setItem("favourites", JSON.stringify(favouritesString))
}

export const isAlreadyAdded = (itemToCheck) => {
    return getFromLocalStorage().some(item => { return item.symbol === itemToCheck.symbol })
}

export const deleteFromFavourites = (itemToRemove) => {

    const updatedFavourites = getFromLocalStorage().filter((obj) => obj.symbol !== itemToRemove)
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
}

