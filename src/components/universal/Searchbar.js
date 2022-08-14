import React from 'react'
import { useEffect, useState } from 'react'

function Searchbar(props) {

  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (event) => {
    return setSearchTerm (event.target.value)
  }

  return (
    <div className='searchBarMain'>
      <form onSubmit={e => e.preventDefault()} >
        <input type="text" name="search" onChange={handleChange} />
        <button onClick={() => props.searchSymbol(searchTerm)}
                type='submit'>Search</button>
      </form>
    </div>
  )
}

export default Searchbar