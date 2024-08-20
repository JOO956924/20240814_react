import type {FC, ReactNode} from 'react'

export type PProps = {children?: ReactNode}

// PProps 객체이고 children이라는 원소를 가진다. 이때 ?:
const P: FC<PProps> = function (props: PProps) {
  const {children} = props
  return <p children={children} />
}

export default P
