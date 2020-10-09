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

const AddButton = styled.div`
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

const AddEditor = styled.div``

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
  max-width: 82%;

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

  .ReactTags__selected {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem 1rem;

    span {
      margin: 0 1rem;
      font-size: 1.2rem;
    }
  }

  .ReactTags__tags input {
    width: 5rem;
    font-size: 1.3rem;
    font-weight: ${props => props.theme.fontRegular};
    color: ${props => props.theme.white};
    line-height: 1.5rem;
    margin-left: 1rem;
    background: transparent;
    border: none;

    &::placeholder {
      color: ${props => props.theme.white};
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

const AddTags = styled.div`
  position: relative;

  .ReactTags__selected span.ReactTags__tag {
    position: relative;
    display: flex;
    align-items: center;
    background: ${props => props.theme.greyishBlue};
    min-width: 5rem;
    margin: 0;
    padding: 0.5rem 2rem 0.5rem 0.9rem;
    font-size: 1.1rem;
    font-weight: ${props => props.theme.fontMedium};
    border-radius: ${props => props.theme.bigBorderRadius};

    &:first-child {
      margin-left: 1rem;
    }
  }

  .ReactTags__selected a.ReactTags__remove {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 3rem;
    position: absolute;
    right: 0;
    left: 0;
    margin: 0;
    padding-right: 0.6rem;
    color: ${props => props.theme.white};
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
  }

  .ReactTags__suggestions {
    position: absolute;
    bottom: 4rem;
    background-color: ${props => props.theme.surfacesBlue};
    border-radius: 4px;
    padding: 0.6rem 0;
  }
  .ReactTags__suggestions ul {
    list-style-type: none;
    width: 20rem;
  }
  .ReactTags__suggestions li {
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 0;
    min-height: 6rem;
    font-weight: ${props => props.theme.fontMedium};
  }
  .ReactTags__suggestions li mark {
    background: none;
    color: ${props => props.theme.mainBlue};
  }
  .ReactTags__suggestions ul li.ReactTags__activeSuggestion {
    background: ${props => props.theme.greyishBlue};
    cursor: pointer;
  }
`

const AddTags_Loading = styled.div`
  margin: 0 1rem;

  & > div {
    width: 2.5rem;
    height: 2.5rem;
  }
`

const AddLoading = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: center;
`

const AddMessage = styled.div`
  text-align: center;

  svg {
    width: 6rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: ${props => props.theme.fontLight};
  }
`

export const Styled = {
  AddIcon,
  AddButton,
  AddInput,
  AddEditor,
  AddInputNumberWrapper,
  AddWidgetsContainer,
  AddWidget,
  AddWidget__Button,
  AddTags,
  AddTags_Loading,
  AddLoading,
  AddMessage
}
