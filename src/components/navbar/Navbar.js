import React from 'react'
import {Link} from 'react-router-dom'
import "../../styles.css"

export default function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/" className='navLink homeLink'>Dan's finnhub lister</Link>
        <Link to="/symbols" className='navLink'>Symbol list</Link>
    </div>
  )
}
