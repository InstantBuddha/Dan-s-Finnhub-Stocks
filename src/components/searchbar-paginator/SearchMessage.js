import React from 'react'

function SearchMessage(props) {
  return (
    <h2>{props.message}</h2>
  )
}

export default React.memo(SearchMessage)