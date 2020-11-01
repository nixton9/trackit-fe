import styled, { keyframes } from 'styled-components'

const SlideDown = keyframes`
    0% {
        transform: translate(-50%, 0);
    }
    100% {
        transform: translate(-50%, 2rem);
    }
`

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  width: max-content;
  padding: 1rem 2.5rem 1rem 1.5rem;
  background-color: ${props => props.theme.surfacesBlack};
  color: ${props => props.theme.white};
  border-radius: ${props => props.theme.smallBorderRadius};
  z-index: 11;
  animation: ${SlideDown} 0.15s linear forwards;
`

const Notification = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};

  svg {
    width: 4rem;
    margin-right: 1.4rem;
  }

  p {
    font-weight: ${props => props.theme.fontSemiBold};
    font-size: 1.2rem;
  }
`

export const Styled = {
  NotificationContainer,
  Notification
}
