import React from 'react'

function Paginator(props) {
    const leftArrow = "<--"
    const rightArrow = "-->"

    return (
        <div>
            <button onClick={() => props.changeCurrentPage(false)}>{leftArrow}</button>
            {props.currentPage}
            <button onClick={() => props.changeCurrentPage(true)}>{rightArrow}</button>
        </div>
    )
}

export default React.memo(Paginator)