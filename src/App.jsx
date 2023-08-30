import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import { StickyNavbar } from '/src/components/StickyNavbar.jsx';
import { Help } from '/src/pages/Help.jsx'
import { About } from '/src/pages/About.jsx'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Login } from '/src/pages/Login.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [logedIn, setLogedIn] = useState(localStorage.getItem("logedIn") === "true")
  const [id, setId] = useState(localStorage.getItem("userId"))

  const handleLogedIn = (log) => {
    setLogedIn(log)
  }
  const hanldeId = (id) => {
    setId(id)
  }

  return (
    <>
      <StickyNavbar logedIn={logedIn} handleLogedIn ={handleLogedIn} hanldeId={hanldeId} id={id}/>
      <div>

      </div>
    </>
  )
}

export default App
