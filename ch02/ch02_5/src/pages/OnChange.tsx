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
    {value: 'front', label: '프론트엔드'},
    {value: 'back', label: '백엔드'},
    {value: 'full-stack', label: '풀스택'},
  ]
  const placeholder = '카테고리 선택'
  const [selected, setSelected] = useState('')
  const onChangeSelect = (e: any) => {
    if (e) {
      setSelected(e.value)
      console.log(e.value)
    } else setSelected('')
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
  const handleFruit = (e: any) => {
    setChoice(e.target.value)
    console.log(e.target.value) // option value
    console.log(e.target.selectedIndex) // option index
    console.log(e.target.options[e.target.selectedIndex].text) // text
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
        key="1"
        onChange={onChangeSelect}
        options={options}
        placeholder={placeholder}></Select>
      <select key="2" value={choice} onChange={handleFruit}>
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
