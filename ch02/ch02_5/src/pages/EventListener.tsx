// onclick적용이 아닌 addEventListener('click')일 경우
// 아래처럼 2번 적용하더라도 모두 적용된다.

// bubbles는 이벤트 대상이 겹칠 경우 겹치는 모든 대상에 이벤트 발생
// isTrusted는 웹브라우저에서 발생하면 true
document.querySelector('#root')?.addEventListener('click', function (e: Event) {
  const {isTrusted, target, bubbles} = e
  console.log('EventListener::mouse click occurs!', isTrusted, target, bubbles)
})
document.getElementById('root')?.addEventListener('click', function (e: Event) {
  const {isTrusted, target, bubbles} = e
  console.log(
    'EventListener::mouse click also occurs!',
    isTrusted,
    target,
    bubbles
  )
})

export default function EventListener() {
  return <div>EventListener</div>
}
