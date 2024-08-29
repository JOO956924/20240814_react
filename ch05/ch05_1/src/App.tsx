import {Provider as ReduxProvider} from 'react-redux'

import ReduxClock from './pages/ReduxClock'
import UseReducerClock from './pages/UseReducerClock'

/* 아래의 코드는 store를 정의하는 코드가 합쳐져서 복잡해 보임
import {configureStore} from '@reduxjs/toolkit'
import {Action} from 'redux'
//1) 최상위 수준에서 동작하기 위해서는 Provider 최상위에서 선언
// 앱을 구성하는 모든 컴포넌트가 함께 공유할 수 있는 상태를 앱 수준 상태
// 줄여서 앱상태(app-level-states)

//2) 리덕스 저장소(Redux Store)에 앱상태에서 선언될 변수 선언과 초기화
type AppState = {
  today: Date
}
const initialAppState = {
  today: new Date()
}

//3) 리덕스 저장소를 사용하려면 reducer(현재상태, 액션)라는 함수사용
const rootReducer = (state: AppState = initialAppState, action: Action) => state

//4) reducer에서 반환된 새로운 상태를 store란 객체로 관리하는 configureStore함수 사용
// prettier-ignore
const store = configureStore({
  reducer: rootReducer, 
  middleware:(getDefaultMiddleware) => {
    return []
  },
})

export default function App() {
  return (
    <ReduxProvider store={store}>
      <main className="p-8">
        <UseReducerClock />
        <ReduxClock />
      </main>
    </ReduxProvider>
  )
}
*/

/* store를 분리해서 간결한 코드 작성 */
import {useStore} from './store'

export default function App() {
  const store = useStore()
  return (
    <ReduxProvider store={store}>
      <main className="p-8">
        <UseReducerClock />
        <ReduxClock />
      </main>
    </ReduxProvider>
  )
}
