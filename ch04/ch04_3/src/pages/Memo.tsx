import {useMemo} from 'react'
import {Title, Avatar} from '../components'
import * as D from '../data'

export default function Memo() {
  // prettier-ignore
  const headTexts = useMemo<string[]>(() => [
    'No.', 'Name', 'Job Title', 'Email Adress'
  ], [])
  // 의존성 목록: 데이터를 갱신하게 할 요소를 의존성이라고 하고 복수일 때 의존성목록.

  const users = useMemo<D.IUser[]>(() => D.makeArray(10).map(D.makeRandomUser), [])

  const head = useMemo(
    () => headTexts.map(text => <th key={text}>{text}</th>),
    [headTexts]
  )

  const body = useMemo(
    () =>
      users.map((user, index) => (
        <tr key={user.uuid}>
          <th>{index + 1}</th>
          <td className="flex items-center">
            <Avatar src={user.avatar} size="1.5rem" />
            <p className="ml-2">{user.name}</p>
          </td>
          <td>{user.jobTitle}</td>
          <td>{user.email}</td>
        </tr>
      )),
    [users]
  )

  return (
    <div className="mt-4">
      <Title>Memo</Title>
      <div className="p-4 mt-4 overflow-x-auto">
        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr className="font-bold text-black uppercase bg-gray-300">{head}</tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
    </div>
  )
}
