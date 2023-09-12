/*
It is common to see conditional rendering based on hover state of some element.

We can achive it by CSS pseduo class :hover, but for more complex cases it might be better to have state controlled by script.

Now you are asked to create a useHover() hook.

function App() {
  const [ref, isHovered] = useHover()
  return <div ref={ref}>{isHovered ? 'hovered' : 'not hovered'}</div>
}
*/

import React, {Ref, useRef, useState, useCallback } from 'react'

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
 
  const [isHovered, setIsHovered] = useState(false)
  const hoverRef = useRef<T>()

  //Set hover state based on mouse events
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  //The previous hovered element is removed, the current hovered element is set
  const refHover = useCallback((element) => {

    //Eventlistners are removed from previous current hoverRef, if it exists
    if(hoverRef.current) {
      hoverRef.current.removeEventListener('mouseenter', handleMouseEnter)
      hoverRef.current.removeEventListener('mouseleave', handleMouseLeave)
    }

    //Set hoverRef.current to current element
    hoverRef.current = element

    //Eventlistners are added to current hoverRef, if it exists
    if(hoverRef.current) {
      hoverRef.current.addEventListener('mouseenter', handleMouseEnter)
      hoverRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

  }, [handleMouseEnter, handleMouseLeave])

  return [refHover, isHovered]
}


//CUSTOM HOOK USEHOVER WITH USEEFFECT

import React, { Ref, useEffect, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): [Ref<T | undefined>, boolean] {
  const ref = useRef<T>();
  const [hover, setHover] = useState(false);

  const setHoverTrue = () => setHover(true);
  const setHoverFalse = () => setHover(false);

  useEffect(() => {
    setHoverFalse();

    const el = ref.current;
    if (!el) return;

    el.addEventListener('mouseenter', setHoverTrue)
    el.addEventListener('mouseleave', setHoverFalse)
    return () => {
      el.removeEventListener('mouseenter', setHoverTrue);
      el.removeEventListener('mouseleave', setHoverFalse);
    }

  }, [ref.current])

  return [ref, hover];
}



