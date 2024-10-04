import type {ChangeEvent, FormEvent} from 'react'
import {useState, useCallback, useEffect, useRef} from 'react'
import {json, Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'
import * as U from '../../utils'

// react의 Record 타입은 key, value형태로 자료를 받을 수 있다.
type LoginFormType = Record<'email' | 'pw', string>
const initialFormState = {email: '', pw: ''}

export default function Login() {
  const [{email, pw}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const navigate = useNavigate()
  const {login} = useAuth()
  const loginAccount = useCallback(() => {
    login(email, pw, () => {
      navigate('/')
    })
  }, [email, pw, navigate, login])

  const emailRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (emailRef.current?.value === '') {
      alert('Please Check Email')
      if (emailRef.current !== null) emailRef.current.focus()
      return
    }
    if (pwRef.current?.value === '') {
      alert('Please Check Password')
      if (pwRef.current !== null) {
        pwRef.current.focus()
      }
      return
    }
    getSession(email, pw)
  }
  const getSession = async (email: string, pw: string) => {
    try {
      new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          body: {email: email, pw: pw},
          dataType: 'json'
        })
          .then(res => res.json)
          .then(json => {
            console.log(json)
          })
          .catch(err => console.log('Error:', err))
      })
    } catch (error) {
    } finally {
    }
  }
  useEffect(() => {
    U.readObjectP<LoginFormType>('user')
      .then(user => {
        if (user) setForm(user)
      })
      .catch(e => {})
    emailRef.current?.focus()
  }, [])
  return (
    <div className="flex flex-col pt-2 bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <form method="post" onSubmit={onSubmit}>
            <h1 className="mb-8 text-2xl font-bold text-center text-primary">Login</h1>
            <input
              type="text"
              name="email"
              ref={emailRef}
              className="w-full p-3 mb-4 input input-primary"
              placeholder="Email"
              value={email}
              onChange={changed('email')}
            />
            <input
              type="password"
              name="pw"
              ref={pwRef}
              className="w-full p-3 mb-4 input input-primary"
              placeholder="Password"
              value={pw}
              onChange={changed('pw')}
            />
            <button
              type="submit"
              className="w-full btn btn-primary"
              onClick={loginAccount}>
              Login
            </button>
          </form>
        </div>
        <div className="mt-6 text-grey-dark">
          Create account?
          <Link className="btn btn-primary btn-link" to="/join">
            Join
          </Link>
        </div>
      </div>
    </div>
  )
}
