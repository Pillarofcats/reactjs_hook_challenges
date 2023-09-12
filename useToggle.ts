/*
It is quite common to see switches and checkboxes in web apps.
Implement useToggle() to make things easier
*/

import React, {useState, useCallback} from 'react'

export function useToggle(on: boolean): [boolean, () => void] {
  
  const [state, setState] = useState<boolean>(on)

  const toggle = useCallback(() => setState((prevState) => !prevState) ,[])

  return [state, toggle]
}