import React, { ReactChildren, ReactElement, RefObject } from 'react'
import { Styled } from '../../styles/Drawer.styles'
import { useSwipeToClose } from '../../utils/useSwipeToClose'

type DrawerProps = {
  children: ReactChildren | ReactChildren[] | ReactElement | ReactElement[]
  title: string
  open: boolean
  setOpen: (val: boolean) => void
  overlayRef: RefObject<HTMLDivElement>
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  title,
  open,
  setOpen,
  overlayRef
}) => {
  const [handleTouchStart, handleTouchMove, handleTouchEnd] = useSwipeToClose(
    setOpen,
    true
  )

  return (
    <>
      <Styled.DrawerContainer
        open={open}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Styled.DrawerTitle>{title}</Styled.DrawerTitle>
        <Styled.DrawerContent>{children}</Styled.DrawerContent>
      </Styled.DrawerContainer>
      <Styled.DrawerOverlay
        ref={overlayRef}
        open={open}
        data-test-id="drawer-overlay"
      />
    </>
  )
}

export default Drawer
