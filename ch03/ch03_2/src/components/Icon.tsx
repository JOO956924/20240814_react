import type {FC, CSSProperties} from 'react'

export type IconProps = {
  name: string
  style?: CSSProperties //?: 없어도 된다
}

export const Icon: FC<IconProps> = function (props: IconProps) {
  const {name, style} = props
  return (
    <span className="material-symbols-outlined" style={style}>
      {name}
    </span>
  )
}
