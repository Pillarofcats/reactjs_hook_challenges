/*
Here is a simple problem, implement useEffectOnce() as the name says itself, it runs an effect only once.
*/

import { EffectCallback, useEffect, useRef } from 'react'

export function useEffectOnce(effect: EffectCallback) {

  const effectRef = useRef(effect)

  useEffect(() => effectRef.current(),[])
}