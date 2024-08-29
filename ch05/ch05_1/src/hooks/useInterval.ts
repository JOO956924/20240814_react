import {useEffect} from 'react'

// 사용자 리액트 훅 함수
export const useInterval = (callback: () => void, duration: number = 1000) => {
  useEffect(() => {
    const id = setInterval(callback, duration)
    return () => clearInterval(id)
  }, [callback, duration])
}
