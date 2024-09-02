import type {Action} from 'redux'

export type State = Date //Date는 interface

// '@clock/setClock' 분기가 들어오면 payload를 다루겠다.
// SetClockAction의 타입은 {type: '@clock/setClock',payload: State}인 객체
export type SetClockAction = Action<'@clock/setClock'> & {
  payload: State
}

export type Actions = SetClockAction
