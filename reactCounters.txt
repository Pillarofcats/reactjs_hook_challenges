import React, {useState, useCallback} from 'react'

export function App() {

  const [counter, setCounter] = useState<number>(0)

  const increment = useCallback(() => {
    setCounter((prevState) => prevState + 1)
  }, [])

  const decrement = useCallback(() => {
    setCounter((prevState) => prevState - 1)
  }, [])

  return (
    <div>
      <button data-testid="decrement-button" onClick={decrement}>-</button>
      <button data-testid="increment-button" onClick={increment}>+</button>
      <p>clicked: {counter}</p>
    </div>
  )
}