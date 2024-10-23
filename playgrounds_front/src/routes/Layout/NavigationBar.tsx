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
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      id="topNav"
      style={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10}} // 이미지 위에 겹치도록 설정
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#page-top">
          LGH
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/logout" onClick={logout}>
                Logout
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/grounds/list">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/friends/list">
                Friends
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/members/mypage">
                My page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
