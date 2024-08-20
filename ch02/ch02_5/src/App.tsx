import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DispatchEvent from './pages/DispatchEvent'
import DragDrop from './pages/DragDrop'
import EventBubbling from './pages/EventBubbling'
import EventLisner from './pages/EventListner'
import FileDrop from './pages/FileDrop'
import FileInput from './pages/FileInput'
import OnChange from './pages/OnChange'
import OnClick from './pages/OnClick'
import ReactOnClick from './pages/ReactOnClick'
import StopPropagation from './pages/StopPropagation'
import VariousInputs from './pages/VariousInputs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <FileDrop />
      <DragDrop />
      <FileInput />
      <OnChange />
      <VariousInputs />
      <StopPropagation />
      <EventBubbling />
      <DispatchEvent />
      <ReactOnClick />
      <OnClick />
      <EventLisner />
    </div>
  )
}

export default App
