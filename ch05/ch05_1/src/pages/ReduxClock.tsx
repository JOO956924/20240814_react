import {useSelector} from 'react-redux'
import type {AppState} from '../store'
import {Div, Title, Subtitle} from '../components'

export default function ReduxClock() {
  // useSelector :: store에 어떤 내용이 저장되었는지 알려고 할 때 스토어의 상태값을 반환
  const today = useSelector<AppState, Date>(state => state.today)

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
