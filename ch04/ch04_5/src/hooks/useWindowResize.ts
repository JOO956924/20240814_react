//창크기를 설정한는 커스텀 훅
import {useState, useEffect} from 'react'
import {useEventListener} from './useEventListener'

export const useWindowResize = () => {
  const [widthHeight, setWidthHeight] = useState<number[]>([0, 0])

  // 클래스 컴포넌트의 componentDidMount 와 같음, 컴포넌트 생성후 마운트 될 때
  useEffect(() => {
    setWidthHeight(notUsed => [window.innerWidth, window.innerHeight])
  }, [])

  // useLayoutEffect : 공기적으로 실행, useEffect : 비동기적으로 실행
  // 콜백함수가 끝나면 동기적, 콜백함수가 끝나기전이면 비동기적(권장)
  // 리액트공식문서에서는 useEffect 권장, useEffect로 안될 때 useLayoutEffect 사용

  useEventListener(window, 'resize', () => {
    setWidthHeight(notUsed => [window.innerWidth, window.innerHeight])
  })
  return widthHeight
}
