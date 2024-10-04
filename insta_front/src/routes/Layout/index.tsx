import {Outlet} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import Main from './Main'

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Main />
    </>
  )
}
