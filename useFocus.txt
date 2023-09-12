/*
CSS pseudo-class :focus-within could be used to allow conditional rendering in parent element on the focus state of descendant elements.

While it is cool, in complex web apps, it might be better to control the state in script.

Now please create useFocus() to support this.

function App() {
  const [ref, isFocused] = useFocus()
  return <div>
    <input ref={ref}/>
    {isFocused && <p>focused</p>}
  </div>
}
*/

import React, { Ref, useRef, useState, useCallback } from 'react'

export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [focus, setIsFocused] = useState<boolean>(false)
  const focusRef = useRef<T>()

  const focused = useCallback(() => setIsFocused(true), [])
  const notFocused = useCallback(() => setIsFocused(false), [])

  const refCB = useCallback((node:T) => {

    if(focusRef.current) {
      focusRef.current.removeEventListener('focus', focused)
      focusRef.current.removeEventListener('blur', notFocused)
    }

    focusRef.current = node
    
    if(focusRef.current) {
      focusRef.current.addEventListener('focus', focused)
      focusRef.current.addEventListener('blur', notFocused)
    }

  }, [focused, notFocused])

  return [refCB, focus]
}


//WITH USEEFFECT


import React, { Ref, useRef, useEffect, useState, useCallback } from 'react'

export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
  const ref = useRef<T>(null)
  const [isFocused, setIsFocused] = useState(false)
  const toggle = useCallback(() => {
    setIsFocused(!isFocused)
  }, [isFocused])

  useEffect(() => {
    const element = ref.current

    element?.addEventListener('focus', toggle)
    element?.addEventListener('blur', toggle)

    return () => {
      element?.removeEventListener('focus', toggle)
      element?.removeEventListener('blur', toggle)
    }
  })

  return [
    ref,
    isFocused
  ]
}
