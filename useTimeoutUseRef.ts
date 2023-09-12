//Create a hook to easily use setTimeout(callback, delay).
//1. reset the timer if delay changes
//2. DO NOT reset the timer if only callback changes

import React, {useRef, useEffect} from 'react'

export function useTimeout(callback: () => void, delay: number) {
  
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    const timeout = setTimeout(() => {
      cbRef.current()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])  

}