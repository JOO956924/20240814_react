import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function NoMatch() {
  const navigate = useNavigate()

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return (
    <div>
      <div className="flex p-4 ">
        <Link to="/">Home</Link>
        <Link to="/login" className="ml-4">
          Login
        </Link>
        <Link to="/join" className="ml-4">
          Join
        </Link>
      </div>
      <p className="p-4 text-xl text-center alert alert-error">Oops! No page found!</p>
      <div className="flex justify-center mt-4">
        <button className="ml-4 btn btn-primary btn-xs" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  )
}
