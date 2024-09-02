import type {FC, PropsWithChildren} from 'react'
import {createContext, useContext} from 'react'
import {useWindowResize} from '../hooks'

//공유하려고 하는 값을 선언
type ContextType = {
  breakpoint: string // 공유 시키려는 데이터 속성
}
//공유하려는 값을 초기화
const defaultContextValue: ContextType = {
  breakpoint: '' // 공유 시키려는 데이터 속성 초기값
}
export const ResponsiveContext = createContext<ContextType>(defaultContextValue)

type ResponsiveProviderProps = {} // 빈객체
export const ResponsiveProvider: FC<PropsWithChildren<ResponsiveProviderProps>> = ({
  children,
  ...props
}) => {
  //구조분해할당할 때 개수가 맞지 않을 때 순서대로 전달
  const [width] = useWindowResize() // [width, height]
  // prettier-ignore
  const breakpoint = width < 640 ? 'sm' : 
                     width < 768 ? 'md' : 
                     width < 1024 ? 'lg' : 
                     width < 1280 ? 'xl' : '2xl'

  // 공유하려고하는 값이 복수개일 경우가 많아서 value라는 객체를 선언
  const value = {
    breakpoint // breakpoint: breakpoint를 간결하게 구현한 것입니다.
  }
  return <ResponsiveContext.Provider value={value} children={children} />
}

// Context에 있는 breakpoint를 끄집어 내기 위해서 선언된 사용자 리액트 훅 함수
export const useResponsive = () => {
  const {breakpoint} = useContext(ResponsiveContext)
  return breakpoint
}
