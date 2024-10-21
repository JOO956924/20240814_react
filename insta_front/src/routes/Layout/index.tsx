import {NavigationBar} from './NavigationBar'
import {MainContents} from './MainContents'

export default function Layout() {
  return (
    <>
      <NavigationBar
        style={{
          backgroundColor: '#bd5d38'
          // width: '23vw',
          // minHeight: '100vh',
          // float: 'left',
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center'
        }}
      />
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
