import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'

const initializeStore = () => {
  // configureStore는 리듀서에서 반환한 새로운 상태를 store 객체로 관리
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return []
    }
  })
  return store
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}

// app state reduxstore initializeStore 상수 store 객체 만들다 configureStore 함수를 호출 recucer 에 rootReducer
// usereducer 데이터관리
