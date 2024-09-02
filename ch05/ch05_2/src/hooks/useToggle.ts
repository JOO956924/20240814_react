import {useState, useCallback} from 'react'

// prettier-ignore
export const useToggle = function (initialCheckd: boolean = false)
: [boolean, () => void] {
  const [checked, setChecked] = useState<boolean>(initialCheckd)
  const toggleChecked = useCallback(() => setChecked(checked => !checked), [])
  return [checked, toggleChecked]
}
