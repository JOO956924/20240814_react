import {useState, useEffect} from 'react'
import {useEventListener} from './useEventListener'

//창크기를 설정한는 커스텀 훅
export const useWindowResize = () => {
  const [widthHeight, setWidthHeight] = useState<number[]>([0, 0])

  // 클래스 컴포넌트의 componentDidMount 와 같음,컴포넌트 생성후 마운트 될때
  useEffect(() => {
    setWidthHeight(function () {
      return [window.innerWidth, window.innerHeight]
    })
  }, [])

  // useLayoutEffect : 동기적 실행, 콜백함수 실행이 끝나면 동기적
  // useEffect : 비동기적 실행, 콜백함수 실행이 끝나기전이면 비동기적(권장)
  // 리액트공식문서에서는 useEffect로 안될 때 useLayoutEffect 사용

  useEventListener(window, 'resize', () => {
    setWidthHeight(notUsed => [window.innerWidth, window.innerHeight])
  })
  return widthHeight
}
