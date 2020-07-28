import styled from 'styled-components'

type DrawerContainerProps = {
  open: boolean
}

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 20vh;
  max-height: 80vh;
  padding: ${props => props.theme.spacingS};
  background: ${props => props.theme.mainGradient};
  border-top-left-radius: ${props => props.theme.mainBorderRadius};
  border-top-right-radius: ${props => props.theme.mainBorderRadius};
  box-shadow: 0 -23px 16px 0 rgba(0, 0, 0, 0.07);
  transform: ${props => (props.open ? 'translateY(0);' : 'translateY(101%);')};
  will-change: transform;
  transition: transform 0.15s linear;
  z-index: 11;
`

const DrawerOverlay = styled.div<DrawerContainerProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1;
`

const DrawerTitle = styled.h2`
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontBold};
  margin: ${props => props.theme.spacingS} 0;
`

const DrawerContent = styled.div`
  width: 100%;
  color: ${props => props.theme.white};
  max-height: 70vh;
  overflow-y: auto;
`

export const Styled = {
  DrawerContainer,
  DrawerTitle,
  DrawerContent,
  DrawerOverlay
}
