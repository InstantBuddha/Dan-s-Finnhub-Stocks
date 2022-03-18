import React from 'react'

function Paginator(props) {
    const leftArrow = "<--"
    const rightArrow = "-->"
  return (
    <div>{leftArrow} {props.currentPage}  {rightArrow}</div>
  )
}

export default React.memo(Paginator)