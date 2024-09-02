import type * as T from './types'

// 5_1에서는 없었던 함수, 리턴하는 객체는 동일한 구조
export const setClock = function (payload: T.State): T.SetClockAction {
  return {
    type: '@clock/setClock',
    payload: payload
  }
}
