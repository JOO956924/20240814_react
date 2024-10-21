import {MainContents} from './MainContents'

export default function Layout() {
  return (
    <>
      <MainContents
        style={{
          backgroundColor: 'white',
          width: '75vw',
          height: '100vh',
          overflow: 'auto',
          padding: '0 40px',
          textAlign: 'left'
        }}
      />
    </>
  )
}
