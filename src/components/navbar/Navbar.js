import React from 'react'
import {Link} from 'react-router-dom'
import "../../styles.css"

export default function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/" className='navLink homeLink'>Dan's finnhub lister</Link>
        <Link to="/stock-market" className='navLink'>Stock exchange</Link>
        <Link to="/crypto" className='navLink'>Crypto</Link>
    </div>
  )
}
