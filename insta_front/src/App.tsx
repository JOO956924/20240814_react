import './assets/styles.css'

import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Join from './pages/members/Join'

import Layout from './routes/Layout'
import NoMatch from './routes/NoMatch'
import Login from './pages/members/Login'
import PrivateRoute from './routes/PrivateRoute'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지는 언제나 접근 가능 */}
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />

        {/* PrivateRoute를 사용하여 인증이 필요한 경로 보호 */}
        <Route path="/" element={<PrivateRoute component={Layout} />} />
        <Route path="/feeds/list" element={<PrivateRoute component={Layout} />} />
        <Route path="/feeds/register" element={<PrivateRoute component={Layout} />} />
        <Route path="/feeds/read" element={<PrivateRoute component={Layout} />} />
        <Route path="/feeds/modify" element={<PrivateRoute component={Layout} />} />
        <Route path="*" element={<PrivateRoute component={NoMatch} />} />
      </Routes>
    </Router>
  )
}

export default App
