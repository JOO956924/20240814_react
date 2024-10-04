import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Provider as ReduxProvider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import type {Action} from '@reduxjs/toolkit'
import {BrowserRouter} from 'react-router-dom'
import RoutesSetup from './routes/RoutesSetup'

type AppState = {today: Date}
const initialAppState = {today: new Date()}
const rootReducer = (state: AppState = initialAppState, action: Action) => state
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddlware => getDefaultMiddlware()
})

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <RoutesSetup />
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
