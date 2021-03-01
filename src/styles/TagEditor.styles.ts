import styled, { keyframes } from 'styled-components/macro'
import { device } from './theme'

export const SlideDown = keyframes`
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`

const TagEditorContainer = styled.div`
  width: 100%;
  padding-bottom: ${props => props.theme.spacingXS};
  animation: ${SlideDown} 0.2s linear forwards;

  form {
    display: flex;
    align-items: center;
  }

  button {
    padding: 1rem;
    margin-left: 5rem;

    svg {
      width: 2rem;
    }
  }

  .loading-spinner {
    margin: ${props => props.theme.spacingXXS} auto 0 auto;
  }

  &.is-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 40%;
    margin: 0 auto;
    max-width: 90%;
    width: 45rem;
    background-color: ${props => props.theme.surfacesBlack};
    padding: 4rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    box-shadow: 0 5px 55px 0 rgba(0, 0, 0, 0.07);

    .close {
      position: absolute;
      top: -0.9rem;
      right: 0;
      font-size: 2.9rem;
      color: #fefefe;
      font-weight: 500;
      transform: rotate(45deg);
      padding: 1rem;
      cursor: pointer;
    }

    form {
      justify-content: center;
    }

    @media ${device.mobileS} {
      button {
        margin-left: 2rem;
      }
    }
  }
`

const TagEditorInput = styled.input`
  width: 14rem;
  background: transparent;
  border: none;
  font-weight: 300;
  font-size: 1.5rem;
  color: ${props => props.theme.white};
  margin-right: 4rem;
  padding: 6px 0 7px 3px;
  border-bottom: 1px solid ${props => props.theme.offWhite};
  border-radius: 0 !important;

  ::placeholder {
    color: ${props => props.theme.offWhite};
  }

  @media ${device.mobileS} {
    margin-right: 2rem;
  }
`

const TagEditorSelect = styled.div`
  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontLight};
    font-size: 1.5rem;
    line-height: 1.6rem;
    min-width: 8rem;
    padding-left: 5px;
    padding-bottom: 9px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.offWhite};
  }

  .MuiSelect-icon {
    width: 1.4rem;
    top: calc(50% - 5px);
    stroke: ${props => props.theme.white};
    height: unset;
  }
`

export const Styled = {
  TagEditorContainer,
  TagEditorInput,
  TagEditorSelect
}
