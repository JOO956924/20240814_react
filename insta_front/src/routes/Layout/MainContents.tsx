import type {FC, CSSProperties} from 'react'
import FeedsList from '../../pages/feeds/List'
import {useLocation} from 'react-router-dom'
import Register from '../../pages/feeds/Register'
import Modify from '../../pages/feeds/Moidify'
import Read from '../../pages/feeds/Read'

export type MainContentsProps = {
  style?: CSSProperties
}

export const MainContents: FC<MainContentsProps> = ({style}) => {
  const location = useLocation()
  // const queryString = location.search
  let {pathname} = location

  // 경로에 따른 컴포넌트 선택
  const renderContent = () => {
    switch (pathname) {
      case '/':
        pathname = '/feeds/list'
        return <FeedsList />
      case '/feeds/list':
        return <FeedsList />
      case '/feeds/register':
        return <Register /> // 다른 컴포넌트 렌더링
      case '/feeds/read':
        return <Read /> // 다른 컴포넌트 렌더링
      case '/feeds/modify':
        return <Modify /> // 다른 컴포넌트 렌더링
      default:
        return <h2>Page Not Found</h2> // 기본 경로 (404 대체)
    }
  }

  return (
    // <!-- Page Content-->
    <div className="p-0 container-fluid" style={{marginTop: '10px', textAlign: 'left'}}>
      {/* <!-- About--> */}
      <section id="about" style={{margin: '0 40px', height: '100vh'}}>
        <div className="resume-section-content">
          <h1 className="mt-4">
            <span className="text-primary">Insta </span>
            <div
              style={{
                fontSize: '32px',
                paddingLeft: '10px',
                display: 'inline-block',
                width: '250px'
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
