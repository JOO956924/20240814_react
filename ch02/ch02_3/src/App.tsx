import {Component, ReactNode, useState} from 'react'
import ClassComponent from './ClassComponent'
import './App.css'

// ComponentClass
// export default class App extends Component {
//   render(): ReactNode {
//     const isLoading = false
//     // if (isLoading) return <p>loading....</p>
//     const children = isLoading ? (
//       <p>loading...</p>
//     ) : (
//       <ul>
//         <li>
//           <a href="http://www.google.com">
//             <p>go to Google</p>
//           </a>
//         </li>
//       </ul>
//     )
//     return (
//       <div>
//         {isLoading && <p>loading...</p>}
//         {!isLoading && <ul>{children}</ul>}
//       </div>
//     )
//   }
// }

// function App() {
//   const [count, setCount] = useState(0)

//   return (

//   )
// }

// export default App

// export default class App extends Component {
//   render(): ReactNode {
//     return (
//       <ul>
//         <ClassComponent href="http://www.google.com" text="go to Google" />
//         <ClassComponent href="http://www.facebook.com" text="go to facebook" />
//       </ul>
//     )
//   }
// }

// 2) function Component
// const App = function () {
//   return <h1>Function Component</h1>
// }
// const App = () => <h1>Function Component</h1>
// export default App

import ArrowComponent from './ArrowComponent'
export default function App() {
  return (
    <ul>
      <ClassComponent href="http://www.google.com" text="go to Google" />
      <ClassComponent href="http://www.facebook.com" text="go to facebook" />
    </ul>
  )
}
