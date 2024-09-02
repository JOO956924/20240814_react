import {Action, Dispatch} from 'redux'
export default function logger<S = any>({getState}: {getState: () => S}) {
  return (next: Dispatch) => (action: Action) => {
    console.log('state before next', getState())
    console.log('action', action)
    // next 호출 전 현재 store의 상태와 유입된 액션을 출력

    const returnedAction = next(action)

    // next 호출 후 현재 store의 상태 출력
    console.log('state after next', getState())

    return returnedAction
  }
}
