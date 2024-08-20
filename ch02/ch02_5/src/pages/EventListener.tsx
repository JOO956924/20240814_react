// onclick적용이 아닌 addEventListener('click')일 경우
// 아래처럼 2번 적용하더라도 모두 적용된다.
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
