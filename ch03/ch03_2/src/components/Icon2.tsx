import type {FC, CSSProperties} from 'react'

export type IconProps2 = {
  name: string
  style?: CSSProperties //?: 없어도 된다
}
// typeScript에서는 ...연산자를 제공(전개연상자, 잔여연산자)를 제공하여 복수개 전송
// data-set 같은 경우를 처리할 수 있다.
export const Icon2: FC<IconProps2> = function (iconProps: IconProps2) {
  const {name, ...remains} = iconProps
  return (
    <span className="material-symbols-outlined" {...remains}>
      {name}
    </span>
  )
}
