import {Provider as ReduxProvider} from 'react-redux'
import {useStore} from './store'
import ClockTest from './pages/ClockTest'
import CounterTest from './pages/CounterTest'
import RemoteUserTest from './pages/RemoteUserTest'
import CardsTest from './pages/CardsTest'

export default function App() {
  const store = useStore() // 리덕스스토어 생성(AppState+Action+reducer)
  return (
    <ReduxProvider store={store}>
      <CardsTest />
      <RemoteUserTest />
      <CounterTest />
      <ClockTest />
    </ReduxProvider>
  )
}
