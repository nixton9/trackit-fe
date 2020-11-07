import styled, { keyframes } from 'styled-components'

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
    align-items: center;
  }

  button {
    padding: 1rem;
    margin-left: 5rem;

    svg {
      width: 2rem;
    }
  }
`

const TagEditorInput = styled.input`
  width: 12rem;
  background: transparent;
  border: none;
  font-weight: 300;
  font-size: 1.5rem;
  color: ${props => props.theme.white};
  margin-right: 4rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.offWhite};

  ::placeholder {
    color: ${props => props.theme.offWhite};
  }
`

const TagEditorSelect = styled.div`
  .MuiSelect-select {
    color: ${props => props.theme.white};
    font-weight: ${props => props.theme.fontLight};
    font-size: 1.5rem;
    min-width: 8rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.offWhite};
  }

  .MuiSelect-icon {
    width: 1.4rem;
  }
`

export const Styled = {
  TagEditorContainer,
  TagEditorInput,
  TagEditorSelect
}
