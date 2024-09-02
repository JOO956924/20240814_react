import type {ChangeEvent} from 'react'
import {useState, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'
import * as D from '../../data'

type SignUpFormType = Record<'email' | 'password' | 'confirmPassword', string>
const initialFormState = {email: D.randomEmail(), password: '1', confirmPassword: '1'}

export default function SignUp() {
  const [{email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const navigate = useNavigate()
  const {signup} = useAuth()
  const createAccount = useCallback(() => {
    console.log(email, password, confirmPassword)
    if (password === confirmPassword) {
      signup(email, password, () => navigate('/login'))
    } else alert('Password is not equal to confirmPassword')
  }, [email, password, confirmPassword, navigate, signup])

  return (
    <div className="flex flex-col min-h-screen border-gray-300 rounded-xl shadow-xl bg-gray-100 border">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">Sign Up</h1>
          <input
            type="text"
            name="email"
            className="w-full p-3 mb-4 input input-primary"
            placeholder="Email"
            value={email}
            onChange={changed('email')}
          />
          <input
            type="password"
            name="password"
            className="w-full p-3 mb-4 input input-primary"
            placeholder="Password"
            value={password}
            onChange={changed('password')}
          />
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 mb-4 input input-primary"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={changed('confirmPassword')}
          />
          <button
            type="submit"
            className="w-full btn btn-primary"
            onClick={createAccount}>
            Create Account
          </button>
        </div>
        <div className="mt-6 text-grey-dark">
          Already have an account?
          <Link className="btn btn-primary btn-link" to="/login/">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
