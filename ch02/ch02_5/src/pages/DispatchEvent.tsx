export default function DispatchEvent() {
  const onCallDispatchEvent = function () {
    console.log('DispatchEvent::mouse click on <button>')
    document
      .getElementById('root')
      ?.dispatchEvent(new Event('Click', {bubbles: true}))
  }
  const onCallClick = function () {
    console.log('DispatchEvent::mouse click on <button>')
    document.getElementById('root')?.click()
  }
  return (
    <div>
      <span>DispatchEvent</span>
      <button onClick={onCallDispatchEvent}>DispatchEvent</button>
      <button onClick={onCallClick}>DispatchEvent</button>
    </div>
  )
}
