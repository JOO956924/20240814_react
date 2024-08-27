import {useMemo, useCallback} from 'react'
import {Title} from '../components'
import {Button} from '../theme/daisyui'
import * as D from '../data'

export default function HighOrderCallback() {
  // 고차함수는 함수와 변수를 차별하지 않으므로 다른 함수의 입력매개변수나 반환값으로 사용.
  // 목적 리액트P/G에서 함수의 타입 불일치를 해결하기 위해 사용

  // useCallback을 사용하는 목적 useCallback을 사용하지 않으면 렌더링할 때 마다 초기화가 된다.
  // 그런데 한번 만든 함수를 새로 선언한다고 해서 그 자체만으로도 부하가 생길일은 없지만,
  // 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 성능에 중요한 문제다
  // 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고
  // 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할건데 이 작업을 하려면, 함수를 재사용하는것이 필수

  const onClick = useCallback((name: string) => () => alert(`${name} clicked`), [])

  const buttons = useMemo(
    () =>
      D.makeArray(3)
        .map(D.randomName)
        .map((name, index) => (
          <Button
            key={index}
            onClick={onClick(name)}
            className="normal-case btn-primary btn-wide btn-xs">
            {name}
          </Button>
        )),
    [onClick]
  )

  return (
    <div className="mt-4">
      <Title>HighOrderCallback</Title>
      <div className="flex mt-4 justify-evenly">{buttons}</div>
    </div>
  )
}
