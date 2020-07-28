import { useState, useEffect, useRef } from 'react'

export const useToggleElement = () => {
  const [open, setOpen] = useState(false)
  const overlayEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlayCurr = overlayEl.current

    overlayEl &&
      overlayCurr &&
      overlayCurr.addEventListener('click', () => setOpen(false))

    return () => {
      overlayEl &&
        overlayCurr &&
        overlayCurr.removeEventListener('click', () => setOpen(false))
    }
  }, [])

  return [open, setOpen, overlayEl] as const
}
