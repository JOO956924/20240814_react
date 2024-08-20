import type {SyntheticEvent} from 'react'

export default function StopPropagation() {
  const onDivClick = function (e: SyntheticEvent) {
    const {isTrusted, target, bubbles, currentTarget} = e
    // prettier-ignore
    console.log('onDivClick',isTrusted,target,bubbles,currentTarget)
  }
  const onButtonClick = (e: SyntheticEvent) => {
    const {isTrusted, target, bubbles} = e
    // prettier-ignore
    console.log('onButtonClick::',isTrusted, target, bubbles)
    e.stopPropagation()
  }
  return (
    <div onClick={onDivClick}>
      <span>StopPropagation</span>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  )
}
