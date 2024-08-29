import type {Action} from 'redux'
// Action은 reducer 함수로 연결된다

// today 변수와'setToday'에 반응하는 Action을 정의한객체
export type SetTodayAction = Action<'setToday'> & {
  today: Date
}
// SetTodayAction 을 Action 변수에 할당
export type Actions = SetTodayAction
