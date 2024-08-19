import './App.css'
import * as D from './data'

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <h3>npm run start</h3>
      <h3>Hot Reloading</h3>
      <h3>webpack: Hot Module Replacement</h3>

      <p>
        {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()},
      </p>
      <img src={D.randomAvatar()} height="50" />
      <img src={D.randomImage()} height="300" />
    </div>
  )
}

export default App
