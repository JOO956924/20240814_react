import {combineReducers} from 'redux'
import * as Clock from './clock'
import * as Counter from './counter'
import * as R from './remoteUser'
import * as Cards from './cards'

// 상태이름: 해당리듀서
export const rootReducer = combineReducers({
  clock: Clock.reducer,
  counter: Counter.reducer,
  remoteUser: R.reducer,
  cards: Cards.reducer
})
