import type {FormEvent, ChangeEvent, ClipboardEvent} from 'react'
import {useCallback, useState, useRef} from 'react'
import {Title} from '../components'
export default function BasicForm() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const refName = useRef<HTMLInputElement>(null)
  const refEmail = useRef<HTMLInputElement>(null)

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(notUsed => e.target.value)
      console.log(name)
    },
    [name]
  )
  // 특별히 정확한 동작을 행하려는 것이 아니라 붙여넣기 이벤트 동작의 활용을 보여줌.
  const onPasteName = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const {clipboardData} = e
      setName(notUsed => clipboardData.getData('text'))
      console.log(name)
    },
    [name]
  )
  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(notUsed => e.target.value)
      console.log(email)
    },
    [email]
  )
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() //웹브라우저가 onSubmit이벤트가 발생하면 form페이지를 리렌더링함. 무조건 사용.

    if (name === '') {
      alert('Please Check Name')
      if (refName.current !== null) refName.current.focus()
      return
    }
    if (email === '') {
      alert('Please Check Email')
      if (refEmail.current !== null) refEmail.current.focus()
      return
    }
    const formData = new FormData() //자바스크립트가 기본으로 제공하는 클래스
    formData.append('name', name)
    formData.append('email', email)
    const json = Object.fromEntries(formData)
    // JSON.stringify(value[,replace, space])
    // value:인코딩하려는 값, replace: 인코딩하길 원하는 프로퍼티가있는 배열 또는 함수, space: 공백문자수
    alert(JSON.stringify(json, null, 2))
  }

  return (
    <section className="mt-4">
      <Title>BasicForm</Title>
      <div className="flex justify-center mt-4">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-primary"
              id="name"
              ref={refName}
              value={name}
              onChange={onChangeName}
              onPaste={onPasteName}
              placeholder="enter your name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              className="input input-primary"
              ref={refEmail}
              id="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="enter your email"
            />
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value="Submit"
              className="w-1/2 btn btn-sm btn-primary"
            />
            <input defaultValue="Cancel" className="w-1/2 ml-4 btn btn-sm" />
          </div>
        </form>
      </div>
    </section>
  )
}
