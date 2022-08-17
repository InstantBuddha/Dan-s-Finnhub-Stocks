import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import UniSymbolTitle from './UniSymbolTitle'



function UniSymbolScreen() {
  const { exchangeType, market, symbol } = useParams()


  return (
    <div>
      <UniSymbolTitle symbol={symbol} />
      <div className='gridContainer responsiveGrid'>

      </div>
    </div>

  )
}

export default UniSymbolScreen