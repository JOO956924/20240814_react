import type {FC, CSSProperties} from 'react'
import GroundsList from '../../pages/grounds/List'
import {useLocation} from 'react-router-dom'
import Register from '../../pages/grounds/Register'
import Modify from '../../pages/grounds/Modify'
import Read from '../../pages/grounds/Read'

export type MainContentsProps = {
  style?: CSSProperties
}

export const MainContents: FC<MainContentsProps> = ({style}) => {
  const location = useLocation()
  const {pathname} = location

  // 경로에 따른 컴포넌트 선택
  const renderContent = () => {
    switch (pathname) {
      case '/':
        return <GroundsList />
      case '/grounds/list':
        return <GroundsList />
      case '/grounds/register':
        return <Register />
      case '/grounds/read':
        return <Read />
      case '/grounds/modify':
        return <Modify />
      default:
        return <h2>Page Not Found</h2>
    }
  }

  return (
    <div className="p-0 container-fluid" style={style}>
      <section id="about" style={{margin: '0 40px', minHeight: '100vh'}}>
        <div className="resume-section-content">
          <h1 className="mt-4">
            <span className="text-primary">Insta </span>
            <div
              style={{
                fontSize: '32px',
                paddingLeft: '10px',
                display: 'inline-block',
                width: '1000px'
              }}>
              {pathname}
            </div>
          </h1>
          <div className="resume-section">{renderContent()}</div>
        </div>
      </section>
    </div>
  )
}
