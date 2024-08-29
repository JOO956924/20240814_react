// import {useSelector} from 'react-redux'
// import type {AppState} from '../store'
// import {Div, Title, Subtitle} from '../components'

// export default function ReduxClock() {
//   // useSelector :: store에 어떤 내용이 저장되었는지 알려고 할 때 스토어의 상태값을 반환
//   const today = useSelector<AppState, Date>(state => state.today)

//   return (
//     <Div className="flex flex-col items-center justify-center mt-16">
//       <Title className="text-5xl">ReduxClock</Title>
//       <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
//       <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
//     </Div>
//   )
// }

import {useSelector, useDispatch} from 'react-redux'
import type {AppState} from '../store'
import {Div, Title, Subtitle} from '../components'
import {useInterval} from '../hooks'

export default function ReduxClock() {
  // useSelector :: store에 상태값을 알고자 할 때
  const today = useSelector<AppState, Date>(state => state.today)

  // useDispatch :: store에 내용을 보낼 때
  const dispatch = useDispatch()

  useInterval(() => {
    // ★ [dispatch(액션) -> 리듀서 -> 리덕스 스토어] 액션은 리듀서에 의해 관여된다.
    // dispatch()함수를 통해 type속성값이 `setToday`인 액션을 리덕스에 호출,
    // today에는 갱신된 Date 객체를 보냄(시간 갱신)
    dispatch({type: 'setToday', today: new Date()})
  })

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
