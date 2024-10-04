import type {Action} from 'redux'
// Action은 reducer 함수로 연결된다

// `setToday` 변수와'today'에 변수를 갱신하는 SetTodayAction을 생성
export type SetTodayAction = Action<'setToday'> & {
  today: Date
}
// SetTodayAction 을 Action 변수에 할당
export type Actions = SetTodayAction
