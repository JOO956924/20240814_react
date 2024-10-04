// import {Title} from '../components'
// import {Form} from '../components'
import {useNavigate} from 'react-router-dom'
import {useState, useRef} from 'react'
import type {FormEvent} from 'react'
// import * as D from '../data'
// import Card from './Card'

export default function Join() {
  const setLabel = (wSize: number): object => {
    return {width: wSize + 'px', display: 'inline-block'}
  }
  const navigate = useNavigate()
  const gotoLogin = () => {
    navigate('/')
  }
  const [pass, setPass] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const refPass = useRef<HTMLInputElement>(null)
  const refEmail = useRef<HTMLInputElement>(null)
  const refRePass = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() //웹브라우저가 onSubmit이벤트가 발생하면 form페이지를 리렌더링함. 무조건 사용.

    if (refEmail.current?.value === '') {
      alert('Please Check Email')
      if (refEmail.current !== null) refEmail.current.focus()
      return
    }
    if (refPass.current?.value === '') {
      alert('Please Check Password')
      if (refPass.current !== null) {
        refPass.current.focus()
      }
      return
    }
    if (refPass.current?.value !== refRePass.current?.value) {
      alert('Please check repass')
      if (refRePass.current !== null) refRePass.current.focus()
      return
    }

    const formData = new FormData() //자바스크립트가 기본으로 제공하는 클래스
    formData.append('pass', pass)
    formData.append('email', email)

    const json = Object.fromEntries(formData)
    // JSON.stringify(value[,replace, space])
    // value:인코딩하려는 값, replace: 인코딩하길 원하는 프로퍼티가있는 배열 또는 함수, space: 공백문자수
    alert(JSON.stringify(json, null, 2))
    gotoLogin()
  }
  return (
    <>
      <h1 className="mb-4 font-bold">Join page</h1>
      <section
        className="m-4"
        style={{
          background: 'gray',
          width: '500px',
          borderRadius: '20px',
          color: 'white'
        }}>
        <title className="mb-5" style={{color: 'white'}}>
          Join
        </title>
        <form method="post" onSubmit={onSubmit}>
          <div className="flex items-center justify-center mb-3 ">
            <label htmlFor="exampleInputid1" style={setLabel(80)}>
              id
            </label>
            <input
              type="email"
              ref={refEmail}
              className="p-1 mt-1 text-black rounded-md form-control"
              id="exampleInputid1"
              aria-describedby="idHelp"
            />
          </div>
          <div className="flex items-center justify-center mb-3">
            <label htmlFor="exampleInputPassword1" style={setLabel(80)}>
              Pass
            </label>
            <input
              type="password"
              ref={refPass}
              className="p-1 text-black rounded-md form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="flex items-center justify-center mb-3">
            <label htmlFor="exampleInputPassword2" style={setLabel(80)}>
              RePass
            </label>
            <input
              type="password"
              ref={refRePass}
              className="p-1 text-black rounded-md form-control"
              id="exampleInputPassword2"
            />
          </div>
          <div className="flex items-center justify-center mb-3 ">
            <label htmlFor="exampleInputmobile1" style={setLabel(80)}>
              mobile
            </label>
            <input
              type="id"
              className="p-1 text-black rounded-md form-control"
              id="exampleInputmobile1"
              aria-describedby="mobileHelp"
            />
          </div>
          <div className="flex items-center justify-center mb-3 ">
            <label htmlFor="exampleInputEmail1" style={setLabel(80)}>
              email
            </label>
            <input
              type="email"
              className="p-1 text-black rounded-md form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="flex items-center justify-center mb-3">
            <label htmlFor="exampleInputgender1" style={setLabel(80)}>
              성별
            </label>
            <div style={setLabel(185)}>
              <label htmlFor="genderMale" className="mr-1.5">
                남
              </label>
              <input
                style={setLabel(50)}
                type="radio"
                id="genderMale"
                name="gender"
                value="male"
                className="mr-3"
              />
              <label htmlFor="genderFemale" className="mr-1.5">
                여
              </label>
              <input
                style={setLabel(50)}
                type="radio"
                id="genderFemale"
                name="gender"
                value="female"
                className="mr-3"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center mb-3">
            <button type="submit" className="mb-1 btn btn-warning">
              <span style={setLabel(70)}>가입</span>
            </button>
            <label htmlFor="exampleInputPassword1" style={setLabel(20)}></label>
            <button type="button" className="mb-1 btn btn-info" onClick={gotoLogin}>
              <span style={setLabel(70)}>취소</span>
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
