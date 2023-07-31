"use client"

import { useEffect, useState } from "react"

export const useCounter = (maxValue: number = 100, delay: number = 100) => {
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const increment = () => {
      setCounter((prevCount) => {
        const newCount = prevCount + 20
        if (newCount >= maxValue) {
          setIsRunning(false)
          return maxValue
        }
        return newCount
      })
    }

    const intervalId = setInterval(increment, delay)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, delay, maxValue])

  const start = () => {
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setCounter(0)
  }

  return {
    counter,
    start,
    stop,
    reset,
    isMax: counter === maxValue,
    isRunning,
  }
}
