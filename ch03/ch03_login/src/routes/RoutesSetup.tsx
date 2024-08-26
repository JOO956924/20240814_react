import {Routes, Route} from 'react-router-dom'
import NoMatch from './NoMatch'
import Login from '../pages/LoginContainer'
import Join from '../pages/JoinContainer'
import Main from '../pages/MainContainer'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
