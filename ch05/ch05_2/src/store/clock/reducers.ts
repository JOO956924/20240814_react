import * as T from './types'

// types 의 State의 Card[]배열의 내용을 [](빈 배열)로 초기화
const initialState: T.State = new Date()

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case '@clock/setClock':
      return action.payload
  }
  return state // 필수
}
