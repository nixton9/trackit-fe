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
    font-size: 1.4rem;
  }
`

const Alert = styled.div`
  color: ${props => props.theme.white};
  padding: 1rem 4rem;

  p {
    font-weight: ${props => props.theme.fontSemiBold};
    font-size: 1.4rem;
    text-align: center;
  }
`

const Alert__Buttons = styled.div`
  display: flex;
  margin-top: ${props => props.theme.spacingXS};

  button {
    font-size: 1.5rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    margin: 0 1.5rem;
    cursor: pointer;
    border: none;
    color: ${props => props.theme.white};
    background: transparent;
    font-weight: ${props => props.theme.fontBold};
    padding: 0.6rem 2rem;
    min-width: 8rem;

    &.confirm {
      background-color: ${props => props.theme.accent};
    }
  }
`

export const Styled = {
  NotificationContainer,
  Notification,
  Alert,
  Alert__Buttons
}
