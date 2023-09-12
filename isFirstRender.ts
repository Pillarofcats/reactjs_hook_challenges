/*function App() {
  const isFirstRender = useIsFirstRender()
  // only true for the first render
  ...
}
*/

//Create a hook to tell if it is the first render.

import React, {useRef} from 'react'

export function useIsFirstRender(): boolean {

  const isFirstRendRef = useRef(true)

  if(isFirstRendRef.current) {
    isFirstRendRef.current = false
    return true
  }

  return isFirstRendRef.current
}

