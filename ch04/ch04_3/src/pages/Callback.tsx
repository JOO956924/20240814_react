import {useMemo, useCallback} from 'react'
import {Title} from '../components'
import {Button} from '../theme/daisyui'
import * as D from '../data'

export default function Callback() {
  // prettier-ignore
  // 일반함수를 사용해서 캐시하고자 할때 렌더링 될 때마다 계속 다시 생성되어 비효율적.
  // 이때 함수를 캐시하면 좋은데 useMemo는 데이터를 캐시하기 때문에 함수를 캐시하는
  // useCallback 훅을 별도로 사용해야 됨.
  // const onClick = function () {alert('button clicked')}

  const onClick = useCallback(() => alert('button clicked'), [])

  const buttons = useMemo(
    () =>
      D.makeArray(3)
        .map(D.randomName)
        .map((name, index) => (
          <Button
            key={index}
            onClick={onClick}
            className="normal-case btn-primary btn-wide btn-xs">
            {name}
          </Button>
        )),
    [onClick]
  )

  return (
    <div className="mt-4">
      <Title>Callback</Title>
      <div className="flex mt-4 justify-evenly">{buttons}</div>
    </div>
  )
}
