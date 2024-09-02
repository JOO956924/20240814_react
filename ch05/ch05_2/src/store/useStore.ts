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
