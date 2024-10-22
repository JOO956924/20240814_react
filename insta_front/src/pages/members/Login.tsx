import type {ChangeEvent, FormEvent} from 'react'
import {useState, useCallback, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
        // prettier ignore
        fetch('http://localhost:8080/api/auth/login?email=' + email + '&pw=' + pw, {
          method: 'POST'
        })
          .then(res => res.text())
          .then(token => {
            if (token.startsWith('{"code"')) {
              navigate('/login')
            } else {
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('email', email)
              navigate('/feeds/list')
            }
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
    <div>
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm mx-auto">
        <div
          className="w-full px-6 py-8 text-black rounded shadow-md"
          style={{background: '#bd5d38'}}>
          <form method="post" onSubmit={onSubmit}>
            <h1 className="mb-8 text-4xl text-center text-white text-primary">
              Insta Feeds
            </h1>
            <input
              type="text"
              name="email"
              ref={emailRef}
              className="w-full p-3 mb-4 text-xl rounded-lg size-22"
              placeholder="Email"
              // value={email}
              onChange={changed('email')}
            />
            <input
              type="password"
              name="pw"
              ref={pwRef}
              className="w-full p-3 mb-4 text-xl rounded-lg size-22"
              placeholder="Password"
              value={pw}
              onChange={changed('pw')}
            />
            <button
              type="submit"
              className="w-full p-3 mb-4 text-2xl text-black bg-yellow-400 rounded-lg size-16"
              onClick={loginAccount}>
              Login
            </button>
          </form>
        </div>
        <div className="mt-6 text-lg text-grey-dark">
          Create account?
          <Link className="ml-5 text-lg" to="/join">
            Join
          </Link>
        </div>
      </div>
    </div>
  )
}
