import styled, { keyframes } from 'styled-components/macro'
import { device } from './theme'

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
  top: 15%;
  left: 0;
  right: 0;
  max-width: 75rem;
  max-height: 90vh;
  margin: 0 auto;
  padding: ${props => props.theme.spacingS} 4rem;
  background: ${props => props.theme.surfacesBlack};
  display: ${props => (props.open ? 'block' : 'none')};
  opacity: ${props => (props.open ? '1' : '0')};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16);
  border-radius: ${props => props.theme.mainBorderRadius};
  transition: all 0.15s linear;
  z-index: 111;

  @media ${device.tablet} {
    top: unset;
    bottom: 0;
    max-width: unset;
    transform: ${props => (props.open ? 'unset;' : 'translateY(102%);')};
    display: block;
    box-shadow: 0 -23px 16px 0 rgba(0, 0, 0, 0.07);
    border-radius: unset;
    border-top-left-radius: ${props => props.theme.mainBorderRadius};
    border-top-right-radius: ${props => props.theme.mainBorderRadius};
  }
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
  z-index: 11;
  animation: ${fadeIn} 0.5s ease;
`

const DrawerTitle = styled.h2`
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: ${props => props.theme.fontBold};
  margin: 0 0 ${props => props.theme.spacingS} -0.8rem;

  @media ${device.tablet} {
    margin: ${props => props.theme.spacingS} 0 ${props => props.theme.spacingS} -0.8rem;
  }

  @media ${device.mobile} {
    margin: ${props => props.theme.spacingXS} 0 ${props => props.theme.spacingS} -0.8rem;
  }
`

const DrawerContent = styled.div`
  width: 100%;
  color: ${props => props.theme.white};
  max-height: 80vh;
`

export const Styled = {
  DrawerContainer,
  DrawerTitle,
  DrawerContent,
  DrawerOverlay
}
