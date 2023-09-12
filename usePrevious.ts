//Create a hook usePrevious() to return the previous value, with initial value of `undefined.

import React, {useRef, useEffect} from 'react'

export function usePrevious<T>(value: T): T | undefined {
  //useRef is mutable and persists through rerenders
  const preValueRef = useRef<T>()
  
  useEffect(() => {
    //Store current value in ref.current
    preValueRef.current = value
  }, [value])

  return preValueRef.current
}

// Ref: https://usehooks.com/usePrevious/