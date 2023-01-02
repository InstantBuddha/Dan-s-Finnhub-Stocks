import React from 'react'

function SearchMessage(props) {
  return (
    <div className='message error'>
      <span className="closebtn">&times;</span>
      {props.message}
    </div>
  )
}

export default React.memo(SearchMessage)