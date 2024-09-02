import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext, useState, useCallback} from 'react'
import * as U from '../utils'

export type LoggedUser = {email: string; password: string}
type Callback = () => void //선언

// 선언
type ContextType = {
  loggedUser?: LoggedUser // 공유 시키려는 데이터 속성
  signup: (email: string, password: string, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

// 초기화
export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

type AuthProviderProps = {}
// 프로바이더 생성
export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)

  const signup = useCallback((email: string, password: string, callback?: Callback) => {
    const user = {email, password}
    setLoggedUser(notUsed => ({email, password}))
    U.writeObjectP('user', user).finally(() => callback && callback())
    // callback && callback()
  }, [])
  const login = useCallback((email: string, password: string, callback?: Callback) => {
    setLoggedUser(notUsed => ({email, password}))
    callback && callback()
  }, [])
  const logout = useCallback((callback?: Callback) => {
    setLoggedUser(undefined)
    callback && callback()
  }, [])

  const value = {
    loggedUser,
    signup,
    login,
    logout
  }
  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
