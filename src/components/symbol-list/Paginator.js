import React from 'react'

function Paginator(props) {
    const leftArrow = "<--"
    const rightArrow = "-->"

    return (
        <div>
            <button onClick={() => props.changeCurrentPage(false)}>{leftArrow}</button>
            page: {`${props.currentPage} `} 
            <select onChange={(e) => props.changePaginateAmount(e.target.value)} >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
            </select>
            <button onClick={() => props.changeCurrentPage(true)}>{rightArrow}</button>
        </div>
    )
}

export default React.memo(Paginator)