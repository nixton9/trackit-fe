import { useState } from 'react'

export const useSwipeToClose = (
  setOpen: (val: boolean) => void,
  isTopToBottom?: boolean
) => {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const canUseSwipe = (e: any) =>
    e.target.tagName.toLowerCase() !== 'p' &&
    e.target.tagName.toLowerCase() !== 'li'

  const handleTouchStart = (e: any) => {
    if (canUseSwipe(e)) {
      setTouchStart(
        isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
      )
    }
  }

  const handleTouchMove = (e: any) => {
    if (canUseSwipe(e)) {
      setTouchEnd(
        isTopToBottom ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
      )
    }
  }

  const handleTouchEnd = (e: any) => {
    if (canUseSwipe(e)) {
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
