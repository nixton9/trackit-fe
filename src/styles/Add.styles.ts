import styled from 'styled-components'

const AddIcon = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.surfacesBlue};
  border-radius: 50%;
  box-shadow: 7px 7px 16px 0 rgba(0, 0, 0, 0.07);
  z-index: 11;
  cursor: pointer;

  svg {
    width: 3rem;
    fill: ${props => props.theme.white};
  }
`

const AddButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.mainBlue};
  color: ${props => props.theme.white};
  border-radius: ${props => props.theme.smallBorderRadius};
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin-bottom: 3rem;
  cursor: pointer;

  span {
    font-weight: ${props => props.theme.fontMedium};
    font-size: 1.5rem;
  }

  svg {
    width: 2.5rem;
    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const AddInput = styled.input`
  width: 100%;
  color: ${props => props.theme.white};
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontLight};
  background: transparent;
  border: none;

  ::placeholder {
    color: inherit;
    font-size: inherit;
    opacity: 0.8;
  }
`

const AddInputNumberWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.white};
  font-size: 1.9rem;
  font-weight: ${props => props.theme.fontRegular};
  margin-bottom: ${props => props.theme.spacingXS};

  span {
    opacity: 0.8;

    &.active {
      opacity: 1;
    }
  }

  input::placeholder {
    opacity: 0.8;
    color: ${props => props.theme.white};
  }
`

const AddWidgetsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacingS};
`

const AddWidget = styled.div`
  background-color: ${props => props.theme.surfacesBlue};
  padding: 1.3rem 1rem 1.3rem 1.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  display: inline-flex;
  align-items: center;
  margin-right: ${props => props.theme.spacingS};

  &:last-of-type {
    margin-right: 0;
  }

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker__input-container {
    display: flex;
    align-items: center;

    input {
      width: 5rem;
      font-size: 1.3rem;
      line-height: 1.5rem;
      font-weight: ${props => props.theme.fontRegular};
      margin-left: 1rem;
    }
  }

  .MuiInput-root {
    .MuiSelect-selectMenu {
      font-size: 1.3rem;
      line-height: 1.5rem;
      font-weight: ${props => props.theme.fontRegular};
      color: ${props => props.theme.white};
      margin-left: 1rem;
      padding: 0;
      padding-right: 1rem;
    }

    svg {
      display: none;
    }
  }

  svg {
    width: 2.8rem;
    display: block;

    .svg-fill {
      fill: ${props => props.theme.white};
    }
    .svg-stroke {
      stroke: ${props => props.theme.white};
    }
  }
`

const AddWidget__Button = styled.button`
  background-color: ${props => props.theme.mainBlue};
  color: ${props => props.theme.white};
  border: none;
  padding: 1.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  margin-left: auto;
  cursor: pointer;

  svg {
    display: block;
    transform: rotate(-90deg);
  }
`

export const Styled = {
  AddIcon,
  AddButton,
  AddInput,
  AddInputNumberWrapper,
  AddWidgetsContainer,
  AddWidget,
  AddWidget__Button
}
