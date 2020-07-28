import React, { ReactChildren, ReactElement, RefObject } from 'react'
import { Styled } from '../../styles/Drawer.styles'

type DrawerProps = {
  children: ReactChildren | ReactElement
  title: string
  open: boolean
  overlayRef: RefObject<HTMLDivElement>
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  title,
  open,
  overlayRef
}) => (
  <>
    <Styled.DrawerContainer open={open}>
      <Styled.DrawerTitle>{title}</Styled.DrawerTitle>
      <Styled.DrawerContent>{children}</Styled.DrawerContent>
    </Styled.DrawerContainer>
    <Styled.DrawerOverlay ref={overlayRef} open={open} />
  </>
)

export default Drawer
