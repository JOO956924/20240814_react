import type {AppState} from './AppState'
import type {Actions} from './actions'

// AppState의 초기화
const initialAppState = {
  today: new Date()
}

// 리덕스 저장소를 사용하려면 reducer(현재상태, 액션)라는 함수사용
// 과거 상태값 today을 새로운 상태값 action.today으로 반환한다. 줄이는 용도
export const rootReducer = (state: AppState = initialAppState, action: Actions) => {
  switch (action.type) {
    case 'setToday': {
      return {...state, today: action.today}
    }
  }
  return state // 필수
}
