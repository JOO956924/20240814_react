import type {FC, PropsWithChildren} from 'react'

export type PProps = {}
// 리액트 17버전까지는 children속성을 FC타입에 포함했지만,
// 18버전부터 FC타입에서 children속성을 제거함.
// 그래서 children?:ReactNode대신에 PropsWithChildren으로 대체함.
const P2: FC<PropsWithChildren<PProps>> = function (props: PProps) {
  // ...props 는 한꺼번에 전달하는 역할
  return <p {...props} />
}

export default P2
