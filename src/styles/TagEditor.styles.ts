import styled, { keyframes } from 'styled-components/macro'

const SlideDown = keyframes`
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
  animation: ${SlideDown} 0.2s ease forwards;

  form {
    display: flex;
    align-items: flex-end;
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
  }
`

export const Styled = {
  TagEditorContainer,
  TagEditorInput,
  TagEditorSelect
}
