import type {FormEvent, ChangeEvent, ClipboardEvent} from 'react'
import {useCallback, useState, useRef} from 'react'
import {Title} from '../components'

type FormType = {name: string; email: string}

export default function ObjectState() {
  const [form, setForm] = useState<FormType>({name: '', email: ''})
  const refName = useRef<HTMLInputElement>(null)
  const refEmail = useRef<HTMLInputElement>(null)
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault() //웹브라우저가 onSubmit이벤트가 발생하면 form페이지를 리렌더링함. 무조건 사용.

      if (form.name === '') {
        alert('Please Check Name')
        if (refName.current !== null) refName.current.focus()
        return
      }
      if (form.email === '') {
        alert('Please Check Email')
        if (refEmail.current !== null) refEmail.current.focus()
        return
      }
      // value:인코딩하려는 값, replace: 인코딩하길 원하는 프로퍼티가있는 배열 또는 함수, space: 공백문자수
      alert(JSON.stringify(form, null, 2))
    },
    [form]
  )
  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // 1) 객체의 형태로 구현
      // const name = e.target.value
      // setForm(/*값을 구현*/)

      // 2) 객체의 형태로 구현 :: 얕은 복사
      // const newForm = form
      // newForm.name = e.target.value
      // setForm(newForm) // 문제 :: form === newForm은 true, 리렌더링 X, 리액트가 내부 변화 감지 못함.

      // 3) 객체의 형태로 구현 :: 깊은 복사
      // const newForm = Object.assign({}, form)
      // newForm.name = e.target.value
      // setForm(newForm) // 문제 :: form === newForm은 false, 리렌더링 O, Object.assign구현의 번거로움.

      // 4) 전개 연산자 활용
      // 아래의 2줄을 한줄로 표현하면 const newForm = {...form, name: e.target.value}
      // const newForm = {...form} //깊은 복사
      // newForm.name = e.target.value
      // setForm(newForm)

      // 5) 콜백함수로 구현 : 간단하게
      // setForm(form => { return {...form, name: e.target.value} }) //return을 사용할 경우
      /* ※ 복합실행문 : 중괄호 안에 order가 여러 개 if(condition) {order1; order2; order3;} */
      // setForm(form => {...form, name: e.target.value}) // 에러: return을 지우면 복합실행문으로 인식

      // 6) 최종 :  ()를 사용하여 복합실행문이 아니라고 표기
      setForm(state => ({...state, name: e.target.value}))
      console.log(form.name)
    },
    [form.name]
  )

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm(form => ({...form, email: e.target.value}))
      console.log(form.email)
    },
    [form.email]
  )

  return (
    <section className="mt-4">
      <Title>ObjectState</Title>
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
              value={form.name}
              onChange={onChangeName}
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
              onChange={onChangeEmail}
              value={form.email}
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
