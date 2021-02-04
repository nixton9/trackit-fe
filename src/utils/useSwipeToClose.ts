import { useState } from 'react'

export const useSwipeToClose = (
  setOpen: (val: boolean) => void,
  isTopToBottom?: boolean
) => {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: any) => {
    if (e.target.tagName.toLowerCase() !== 'p') {
      setTouchStart(
        isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
      )
    }
  }

  const handleTouchMove = (e: any) => {
    if (e.target.tagName.toLowerCase() !== 'p') {
      setTouchEnd(
        isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
      )
    }
  }

  const handleTouchEnd = (e: any) => {
    if (e.target.tagName.toLowerCase() !== 'p') {
      if (isTopToBottom) {
        if (touchStart - touchEnd < -70) {
          setOpen(false)
        }
      } else {
        if (touchStart - touchEnd > 45) {
          setOpen(false)
        }
      }
    }
  }

  return [handleTouchStart, handleTouchMove, handleTouchEnd]
}
