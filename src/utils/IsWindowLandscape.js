export function isWindowLandscape(innerWidth, innerHeight){
    if(innerHeight - innerWidth > 0){return false}
    return true
}