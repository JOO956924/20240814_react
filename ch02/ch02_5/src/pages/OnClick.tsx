const rootDiv = document.getElementById('root')
if (rootDiv) {
  rootDiv.onclick = function (e: Event) {
    const {isTrusted, target, bubbles} = e
    console.log('OnClick::mouse click on rootDiv', isTrusted, target, bubbles)
  }
  rootDiv.onclick = function (e: Event) {
    const {isTrusted, target, bubbles} = e
    console.log('OnClick::mouse click also rootDiv', isTrusted, target, bubbles)
  }
}

export default function OnClick() {
  return <div>Onclick</div>
}
