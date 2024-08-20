export default function DispatchEvent() {
  const onCallDispatchEvent = function () {
    console.log('DispatchEvent::mouse click on <button>')
    // prettier-ignore
    document
      .getElementById('root')
      ?.dispatchEvent(new Event('Click', {bubbles: true}))
  }
  // 결과 : window의 EventListener, onclick은 isTrusted가 true
  // new Event()의 window의 이벤트가 아니기 때문에 isTrusted가 false로 1번 나온다
  const onCallClick = function () {
    console.log('DispatchEvent::mouse click on <button>')
    document.getElementById('root')?.click()
  }
  return (
    <div>
      {/* prettier-ignore */}
      <span>DispatchEvent</span>
      <button onClick={onCallDispatchEvent}>DispatchEvent</button>
      <button onClick={onCallClick}>CallClick</button>
    </div>
  )
}
