import {useNavigate} from 'react-router-dom'
import '../../App.css'
import type {FC, CSSProperties} from 'react'

export type NavProps = {
  style?: CSSProperties
}

export const NavigationBar: FC<NavProps> = ({style}) => {
  const navigate = useNavigate()

  const logout = (e: React.MouseEvent) => {
    e.preventDefault()
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    navigate('/')
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
      id="sideNav">
      <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-block d-lg-none">LGH</span>
        <span className="d-none d-lg-block">
          <img
            className="mx-auto mb-2 img-fluid img-profile rounded-circle"
            src="/profile.jpg"
            alt="..."
          />
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="/logout" onClick={logout}>
              Logout
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="/feeds/list">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="/friends/list">
              Friends
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="/members/mypage">
              My page
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
