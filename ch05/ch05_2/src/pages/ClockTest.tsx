import {useSelector, useDispatch} from 'react-redux'
import {Title} from '../components'
import {useInterval} from '../hooks'
import type {AppState} from '../store'
import * as C from '../store/clock'

export default function ClockTest() {
  const clock = useSelector<AppState, C.State>(state => state.clock)
  const dispatch = useDispatch()
  // useInterval(() => dispatch({type: '@clock/setClock', payload: new Date()}))
  // 위의 5_1은 객체를 변수에 할당,
  // 아래의 C.setClock()은 객체를 리턴해주는 함수를 store에 정의해서 사용.
  useInterval(() => dispatch(C.setClock(new Date())))

  return (
    <section className="mt-4">
      <Title>ClockTest</Title>
      <div className="mt-4 text-3xl flex justify-center">
        <p className="text-2xl text-blue-600 text-bold">{clock.toLocaleTimeString()}</p>
      </div>
      <div className="mt-4 text-3xl flex justify-center">
        <p className="text-lg text-blue-400 text-bold">{clock.toLocaleDateString()}</p>
      </div>
    </section>
  )
}
