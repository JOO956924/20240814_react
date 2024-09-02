import {combineReducers} from 'redux'
import * as L from './loading'
import * as E from './errorMessage'
import * as F from './fetchUser'

// 상태이름: 해당리듀서
export const rootReducer = combineReducers({
  loading: L.reducer,
  errorMessage: E.reducer,
  fetchUser: F.reducer
})
