import type {ChangeEvent} from 'react'
import {useState} from 'react'
import Select from 'react-select'

export default function OnChange() {
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('onChangeValue', e.target.value)
  }
  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    console.log('onChangeChecked', e.target.checked)
  }
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    console.log('onChangeFiles', e.target.files)
  }

  // react-select 관련 start
  const options = [
    {value: 'CS', label: 'CS'},
    {value: '프론트', label: '프론트'},
  ]
  const placeholder = '카테고리 선택'
  const [selected, setSelected] = useState('')
  const onChangeSelect = (e: any) => {
    if (e) setSelected(e.value)
    else setSelected('')
  }
  // react-select 관련 end

  // react 기본 컴포넌트의 select
  const [choice, setChoice] = useState('apple')
  const fruits = ['apple', 'orange', 'pineapple']
  const options2 = fruits.map((fruit, index) => (
    <option key={index} value={fruit}>
      {fruit}
    </option>
  ))
  const handleFruit = (e: any, index: number) => {
    setChoice(e.target.value)
    console.log(e.target.value)
    console.log(index)
  }

  return (
    <div>
      <p>OnChange</p>
      <input
        type="text"
        onChange={onChangeValue}
        placeholder="type some text"
      />
      <input type="checkbox" onChange={onChangeChecked} defaultChecked />
      <input type="file" onChange={onChangeFiles} multiple accept="images/*" />
      <Select
        onChange={onChangeSelect}
        options={options}
        placeholder={placeholder}></Select>
      <select value={choice} onChange={handleFruit}>
        {options2}
      </select>
    </div>
  )
}
