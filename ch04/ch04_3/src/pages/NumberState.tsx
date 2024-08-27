import {useState, useCallback} from 'react'
import {Title} from '../components'
import {Icon} from '../theme/daisyui'

export default function NumberState() {
  const [count, setCount] = useState<number>(0)

  // S :: 방법0) function 으로 정의
  // const increment = function () {
  //   setCount(count + 1)
  //   console.log('count: ', count)
  // }

  // S :: 방법1) 방법0을 화살표 함수로 변환.
  // const increment = () => {
  //   setCount(count + 1)
  //   console.log('count: ', count)
  // }

  // ()=>S :: 방법2) setCount 매개변수를 함수로 지정.
  // const increment = () => { //고차원 콜백함수
  //   setCount(count => count + 1)
  //   console.log('count: ', count)
  // }

  // useCallback을 사용하는 목적 : 위의 방법 1, 2는 리렌더링 될 때마다 새로 초기화가 된다.
  // 그런데 한번 만든 함수를 새로 선언한다고 해서 그 자체만으로도 부하가 생길일은 없지만,
  // 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 성능에 중요한 문제다
  // 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고
  // 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할건데 이 작업을 하려면, 함수를 재사용하는것이 필수

  // 방법3) useCallback 사용하고 의존성 목록[] 이 비어있을 때 => count는 0을 유지
  // const increment = useCallback(() => {
  //   setCount(count + 1)
  //   console.log('count: ', count)
  // }, [])

  // 방법4) useCallback 사용하고 의존성 목록에 값이 있을 때 => count는 증감
  // const increment = useCallback(() => {
  //   setCount(count + 1)
  //   console.log('count: ', count)
  // }, [count])

  // 방법5) useCallback 사용하고 의존성 목록에 값이 없으면서 입력변수가 함수일 때는
  // 현재 유지되고 있는 값을 매개변수로 해서 세터 함수를 호출하게 되고,
  // 이때 세터함수가 반환한 값을 새로운 count값으로 설정하므로
  // count의존성 목록에 없어도 값은 증가, 그러나 내부 count변수의 값을 변경되지 않는다.
  // const increment = useCallback(() => {
  //   setCount(count => count + 1)
  //   console.log('count inc: ', count)
  // }, [])

  // 방법6) useCallback 사용하면서 의존성 목록에 값이 있으면서 입력변수가 함수일 때는
  // 값이 증가하면서 내부 변수도 변경된다.
  const increment = useCallback(() => {
    setCount(count => count + 1)
    console.log('count inc: ', count)
  }, [count])

  const decrement = useCallback(() => {
    setCount(count => count - 1)
    console.log('count dec: ', count)
  }, [count])

  return (
    <section className="mt-4 mb-8">
      <Title>NumberState</Title>
      <div className="flex justify-center">
        <div className="flex items-center justify-between w-1/4 mt-4">
          <Icon name="add" className="btn-primary btn-lg" onClick={increment} />
          <p className="text-3xl text-bold text-primary">{count}</p>
          <Icon name="remove" className="btn-primary btn-lg" onClick={decrement} />
        </div>
      </div>
    </section>
  )
}
