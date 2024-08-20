import {DragEvent} from 'react'
// DragDrop event 종류
// dragenter : 드롭 대상 위로 마우스가 올라갈 때
// dragstart : 드래그하기 시작할 때
// drag : 드래그가 발생할 때
// dragover : 적합한 드래그 대상 위로 지나갈 때
// dragleave : 적합한 드래그 대상을 벗어날 때
// dragend : 드래그가 끝날 때
// drop : 적합한 대상에 드롭 할 때

export default function DragDrop() {
  const onDragStart = (e: DragEvent<HTMLInputElement>) =>
    console.log('onDragStart', e.dataTransfer)
  const onDragEnter = (e: DragEvent<HTMLInputElement>) =>
    console.log('onDragEnter', e.dataTransfer)
  const onDragLeave = (e: DragEvent) =>
    console.log('onDragLeave', e.dataTransfer)
  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    console.log('onDrop', e.dataTransfer)
  }

  return (
    <div>
      <p>DragDrop</p>
      <div draggable onDragStart={onDragStart} onDragLeave={onDragLeave}>
        <h1>Drag Me</h1>
      </div>
      <div onDrop={onDrop} onDragEnter={onDragEnter}>
        <h1>Drag over Me</h1>
      </div>
    </div>
  )
}
