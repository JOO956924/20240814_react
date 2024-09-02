import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'
// import logger from './logger'
import logger from 'redux-logger'
// thunk :: action을 함수로서 호출해 주는 기능을 추가한 미들웨어
import {thunk} from 'redux-thunk'

const useLogger = process.env.NODE_ENV !== 'production'

const initializeStore = () => {
  const middleware: any[] = () => [thunk]
  if (useLogger) middleware.push(logger)
  const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
  })
  return store
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
