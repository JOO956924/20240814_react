import {Title} from '../components'
import {useRef, useEffect} from 'react'

export default function InputFocusTest() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef.current?.focus(), [])

  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>InputFocusTest</Title>
      <div className="flex justify-center mt-4 ">
        <input className="input input-primary" ref={inputRef}
          placeholder="enter some text"/>
      </div>
    </section>
  )
}
