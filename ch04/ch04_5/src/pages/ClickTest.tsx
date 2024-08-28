import {Title} from '../components'
import {useRef, useCallback} from 'react'

export default function ClickTest() {
  const inputRef = useRef<HTMLInputElement>(null)
  // const onClick = useCallback(()=>{
  //   const input = inputRef.current
  //   if(!input) return null
  //   input.click();
  // }, [])

  // ?. :: null이 아닌 경우에 inputRef.current값을 얻게 함. 널병합 연산자
  const onClick = useCallback(() => inputRef.current?.click(), [])

  return (
    <section className="mt-4">
      <Title>ClickTest</Title>
      <div className="flex items-center justify-center mt-4">
        <button className="mr-4 btn btn-primary" onClick={onClick}>
          Click Me
        </button>
        <input className="hidden" type="file" accept="image/*" ref={inputRef} />
      </div>
    </section>
  )
}
