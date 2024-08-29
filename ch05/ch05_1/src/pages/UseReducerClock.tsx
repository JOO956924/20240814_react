import {useReducer} from 'react'
import type {AppState} from '../store'
import type {SetTodayAction} from '../store/actions'
import {Div, Title, Subtitle} from '../components'
import {useInterval} from '../hooks'

  export default function UseReducerClock() {
    // 리덕스의 상태는 앱의 모든 컴포넌트에서 접근 가능하지만(즉, 전역 상태)
    // useReducer훅은 다른 훅들처럼 useReducer훅을 호출한 컴포넌트안에서만 유효
    // 이유는 ReduxProvider와 같은 컨텍스트 없이 사용하기 때문이다.

    // useReducer()는 리덕스의 리듀서와 사실상 똑같은 기능 수행
    // useReducer(리듀서, 상태초기값)
    /* useReducer는 리액트의 훅 함수
    function useReducer<R extends Reducer<any, any>>(
      reducer: R,
      initialState: ReducerState<R>
      initializer?: undefined
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>]*/
    const [{today}, dispatch] = useReducer(
      // reducer
      (state: AppState, action: SetTodayAction) => {
        switch (action.type) {
          case 'setToday':
            return {...state, today: new Date()}
        }
      },
      //initialState
      {
        today: new Date()
      }
    ) //리턴타입 [ReducerState<R>, Dispatch<ReducerAction<R>>]

    useInterval(() => {
      dispatch({type: 'setToday', today: new Date()})
    })

    return (
      <Div className="flex flex-col items-center justify-center h-24">
        <Title className="text-5xl">UseReducerClock</Title>
        <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
        <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
      </Div>
    )
  }
  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
