import RoutesSetup from './routes/RoutesSetup'
import {BrowserRouter} from 'react-router-dom'

import './App.css'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <RoutesSetup />
      </div>
    </BrowserRouter>
  )
}

export default App
