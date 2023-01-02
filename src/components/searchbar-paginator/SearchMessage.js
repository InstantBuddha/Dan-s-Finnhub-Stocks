import React, { useState } from 'react'

function SearchMessage(props) {
  //add onClick to change css to .hidden
  const [ cssClassName, setCssClassName ] = useState("message error")

  return (
    <div className={cssClassName}>
      <span className="closebtn" onClick={() => setCssClassName("hidden")}>&times;</span>
      {props.message}
    </div>
  )
}

export default React.memo(SearchMessage)