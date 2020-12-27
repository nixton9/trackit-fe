import { useState } from 'react'

export const useSwipeToClose = (
  setOpen: (val: boolean) => void,
  isTopToBottom?: boolean
) => {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: any) => {
    setTouchStart(
      isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
    )
  }

  const handleTouchMove = (e: any) => {
    setTouchEnd(
      isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
    )
  }

  const handleTouchEnd = () => {
    if (isTopToBottom) {
      if (touchStart - touchEnd < -45) {
        setOpen(false)
      }
    } else {
      if (touchStart - touchEnd > 45) {
        setOpen(false)
      }
    }
  }

  return [handleTouchStart, handleTouchMove, handleTouchEnd]
}
