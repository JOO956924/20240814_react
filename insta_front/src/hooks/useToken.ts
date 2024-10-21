import {useState, useEffect} from 'react'

const useToken = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token')
    if (sessionToken) {
      setToken(sessionToken)
    } else {
      setToken(null)
    }
  }, [])
  return token
}

export default useToken
