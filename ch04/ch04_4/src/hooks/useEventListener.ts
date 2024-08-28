import {useEffect} from 'react'

export const useEventListener = (
  target: EventTarget | null, // 대상(window, button, input 등)
  type: string, // 이벤트 타입
  callback: EventListenerOrEventListenerObject | null //콜백함수
) => {
  useEffect(() => {
    if (target && callback) {
      target.addEventListener(type, callback)
      return () => target.removeEventListener(type, callback)
    }
  }, [target, type, callback])
}
