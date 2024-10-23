import {MainContents} from './MainContents'
import {NavigationBar} from './NavigationBar'

export default function Layout() {
  return (
    <>
      {/* 상단에 고정된 네비게이션 바 */}
      <NavigationBar
        style={{
          backgroundColor: '#bd5d38',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000
        }}
      />

      {/* 메인 컨텐츠 */}
      <div style={{paddingTop: '60px'}}>
        {/* 직접 위치 조정 */}
        <MainContents
          style={{
            backgroundColor: 'white',
            // width: '100%',
            padding: '20px',
            textAlign: 'left',
            overflowY: 'auto',
            minHeight: '100vh',
            position: 'relative', // 상대 위치 사용
            left: '-130px' // 중앙에서 왼쪽으로 50px 이동
          }}
        />
      </div>
    </>
  )
}
