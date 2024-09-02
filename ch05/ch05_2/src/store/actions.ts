import type {Action} from 'redux'
// Action은 reducer 함수로 연결된다.

// 'setToday'에 대하여 today 변수를 갱신하는 SetTodayAction 생성
export type SetTodayAction = Action<'setToday'> & {
  today: Date
}

// SetTodayAction을 Actions 변수에 할당
export type Actions = SetTodayAction
