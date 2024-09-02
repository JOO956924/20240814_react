import type * as T from './types'

// payload 는 리덕스커뮤티니티에서 관행을 사용하는 타입과 변수 이름
export const setCounter = (payload: T.State): T.SetCounterAction => ({
  type: '@counter/setCounter',
  payload
})

export const increaseCounter = () => setCounter(1)
export const decreaseCounter = () => setCounter(-1)
