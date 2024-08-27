import UseOrCreateTest from './pages/UseOrCreateTest'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import HighOrderCallback from './pages/HighOrderCallback'

function App() {
  return (
    <div className="App">
      <HighOrderCallback />
      <Callback />
      <Memo />
      <UseOrCreateTest />
    </div>
  )
}

export default App
