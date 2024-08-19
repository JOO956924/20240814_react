import {Component, ReactNode} from 'react'

export type ClassComponentProps = {
  href: string
  text: string
}
// 모든 클래스컴포넌트의 부모타입인 Component는 props라는 이름의 속성을 제공.
// 속성은 부모컴포넌트가 자식 컴포넌트 쪽에 정보를 전달하는 목적으로 사용.
// 컴포넌트의 속성은 객체여야 한다.
export default class ClassComponent extends Component<ClassComponentProps> {
  render() {
    const {href, text} = this.props // 구조분해할당
    // <Person info="{{name: 'Jack', age: 32}}" /> //속성에 객체가 할당될 경우
    return (
      <li>
        <a href={href}>
          <p>{text}</p>
        </a>
      </li>
    )
  }
}
