import React from 'react'
import LoginContainer from './pages/LoginContainer'
import logo from './logo.svg'
import JoinContainer from './pages/JoinContainer'
import RoutesSetup from './routes/RoutesSetup'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <BrowserRouter>
        <RoutesSetup />
      </BrowserRouter>
    </main>
  )
}

export default App
