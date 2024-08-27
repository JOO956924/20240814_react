import {useState, useCallback} from 'react'

export const useToggle = (initialCheckd: boolean = false): [boolean, () => void] => {
  const [checked, setChecked] = useState<boolean>(initialCheckd)
  const toggleChecked = useCallback(() => setChecked(checked => !checked), [])
  return [checked, toggleChecked]
}
