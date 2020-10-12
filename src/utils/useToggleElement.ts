import { useState, useEffect, useRef } from 'react'

export const useToggleElement = (onClose?: () => any) => {
  const [open, setOpen] = useState(false)
  const overlayEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlayCurr = overlayEl.current
    const onClick = () => {
      setOpen(false)
      onClose && onClose()
    }

    overlayEl && overlayCurr && overlayCurr.addEventListener('click', onClick)

    return () => {
      overlayEl &&
        overlayCurr &&
        overlayCurr.removeEventListener('click', onClick)
    }
  }, [onClose])

  return [open, setOpen, overlayEl] as const
}
