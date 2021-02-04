import styled, { keyframes } from 'styled-components/macro'

const SlideDown = keyframes`
    0% {
        transform: translate(-50%, -6rem);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`

const NotificationContainer = styled.div`
  position: fixed;
  top: 7%;
  left: 50%;
  width: 75%;
  min-width: 20rem;
  max-width: 95%;
  padding: 2rem 3rem 2rem 2.5rem;
  background-color: ${props => props.theme.surfacesBlack};
  color: ${props => props.theme.white};
  border-radius: ${props => props.theme.smallBorderRadius};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16);
  z-index: 1111;
  animation: ${SlideDown} 0.2s ease forwards;

  &.alert {
    padding: 2rem 2.5rem;
  }
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
    margin: 0 auto;

    &.extra-padding {
      padding: 0.5rem;
    }
  }
`

const UndoButton = styled.button`
  font-size: 1.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  font-weight: ${props => props.theme.fontBold};
  padding: 0.6rem 2rem;
  min-width: 8rem;
  max-width: 9rem;
  text-align: center;
  margin: 0.5rem auto;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.alwaysWhite};
  border: none;
  display: block;
  cursor: pointer;

  &:active,
  &:hover {
    background-color: ${props => props.theme.darkenAccent};
  }
`

const Alert = styled.div`
  color: ${props => props.theme.white};

  p {
    font-weight: ${props => props.theme.fontSemiBold};
    font-size: 1.4rem;
    text-align: center;
  }
`

const Alert__Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

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
      color: ${props => props.theme.alwaysWhite};
    }
  }
`

export const Styled = {
  NotificationContainer,
  Notification,
  UndoButton,
  Alert,
  Alert__Buttons
}
