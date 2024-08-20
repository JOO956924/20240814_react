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
import P from './P'
import P2 from './P2'
export default function App() {
  // children 속성은 <div>처럼 하위속성을 포함할 수 있는 컴포넌트에서만 사용
  // children 속성의 타입은 값을 설정하지 않아도 되는 선택 속성. A?:ReactNode|undefined
  const texts = ['hello', 'world'].map(function (text: string, index: number) {
    return <p key={index} children={text} />
  })
  const texts2 = ['hello', 'world'].map((text, index) => (
    <P key={index} children={text} />
  ))
  const texts3 = ['hello', 'world'].map((text, index) => (
    <P2 key={index} children={text} />
  ))
  return (
    <>
      <ul>
        <ClassComponent href="http://www.google.com" text="go to Google" />
        <ClassComponent href="http://www.facebook.com" text="go to facebook" />
        <ArrowComponent href="http://www.google.com" text="go to Google" />
        <ArrowComponent href="http://www.facebook.com" text="go to facebook" />
      </ul>
      <div children={texts} />
      <div children={texts2} />
      <div children={texts3} />
    </>
  )
}
