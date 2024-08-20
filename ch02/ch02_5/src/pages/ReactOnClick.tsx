import type {SyntheticEvent} from 'react'

export default function ReactOnClick() {
  const onClick = function (e: SyntheticEvent) {
    const {isTrusted, target, bubbles} = e
    console.log(
      'ReactOnClick::mouse click on <button>',
      isTrusted,
      target,
      bubbles
    )
  }
  // html 요소의 이벤트 속성은 모두 소문자.
  // 리액트 코어 컴포넌트의 속성은 카멜표기법.
  // 리액트 컴포넌트의 이벤트 속성에 설정하는 콜백함수는
  // e의 타입이 Event가 아닌 SyntheticEvent여야 함.sythetic(합성의,조합의)
  // 출력의 결과가 물리 DOM의 이벤트와 크게 다르지 않다
  return (
    <>
      <span>ReactOnClick</span>
      <button onClick={onClick}>Click me</button>
    </>
  )
}
