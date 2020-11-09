import styled, { keyframes } from 'styled-components'

type DrawerContainerProps = {
  open: boolean
}

export const fadeIn = keyframes`
  0% { 
    opacity: 0;
  } 100% { 
    opacity: 1;
  }
`

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 20vh;
  max-height: 80vh;
  padding: ${props => props.theme.spacingS} 4rem;
  background: ${props => props.theme.surfacesBlack};
  border-top-left-radius: ${props => props.theme.mainBorderRadius};
  border-top-right-radius: ${props => props.theme.mainBorderRadius};
  box-shadow: 0 -23px 16px 0 rgba(0, 0, 0, 0.07);
  transform: ${props => (props.open ? 'translateY(0);' : 'translateY(101%);')};
  will-change: transform;
  transition: transform 0.15s linear;
  z-index: 111;
`

const DrawerOverlay = styled.div<DrawerContainerProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 1;
  animation: ${fadeIn} 0.5s ease;
`

const DrawerTitle = styled.h2`
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontBold};
  margin: ${props => props.theme.spacingS} 0 ${props => props.theme.spacingS} -0.8rem;
`

const DrawerContent = styled.div`
  width: 100%;
  color: ${props => props.theme.white};
  max-height: 70vh;
`

export const Styled = {
  DrawerContainer,
  DrawerTitle,
  DrawerContent,
  DrawerOverlay
}
