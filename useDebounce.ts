/*
For a frequently changing value like text input you might want to debounce the changes.
Implement useDebounce() to achieve this.

function App() {
  const [value, setValue] = useState(...)
  // this value changes frequently, 
  const debouncedValue = useDebounce(value, 1000)
  // now it is debounced
}
*/

import React, {useState, useEffect} from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  
  const [val, setVal] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
        setVal(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return val
}