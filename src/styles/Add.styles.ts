import styled from 'styled-components/macro'
import { device } from './theme'

const AddButton = styled.div`
  width: 100%;
  background-color: ${props => props.theme.accent};
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

const AddInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  .task-status {
    margin-right: ${props => props.theme.spacingXS};
    align-self: center;
  }
`

const AddInput = styled.input`
  width: 100%;
  color: ${props => props.theme.offWhite};
  font-size: 2.2rem;
  font-weight: ${props => props.theme.fontLight};
  background: transparent;
  border: none;

  ::placeholder {
    color: inherit;
    font-size: inherit;
    opacity: 0.8;
  }
`

const AddInput__Label = styled.label`
  color: ${props => props.theme.accent};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontBold};
  margin-right: 2rem;
  transform: translateY(-2px);
`

const AddEditor = styled.div``

const AddInputNumberWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.white};
  font-size: 3rem;
  font-weight: ${props => props.theme.fontExtraLight};
  margin-bottom: ${props => props.theme.spacingXS};

  span {
    opacity: 0.35;

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
  background-color: ${props => props.theme.backgroundBlack};
  padding: 1.3rem 1rem 1.3rem 1.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  display: inline-flex;
  align-items: center;
  margin-right: ${props => props.theme.spacingS};
  max-width: 82%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:active {
    background-color: #17181b;
  }

  &:last-of-type {
    margin-right: 0;
  }

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .tasks-add-date input {
    display: none;
  }

  .react-datepicker__input-container {
    display: flex;
    align-items: center;

    input {
      width: 5rem;
      font-size: 1.3rem;
      line-height: 1.5rem;
      font-weight: ${props => props.theme.fontRegular} !important;
      margin-left: 1rem;
      width: 5rem;
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
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
    color: ${props => props.theme.offWhite};
    line-height: 1.5rem;
    margin-left: 1rem;
    background: transparent;
    border: none;
    position: relative;

    &::placeholder {
      color: ${props => props.theme.white};
    }
  }

  .MuiInput-root {
    .MuiSelect-selectMenu {
      font-size: 1.3rem;
      line-height: 1.5rem;
      font-weight: ${props => props.theme.fontRegular};
      color: ${props => props.theme.offWhite};
      margin-left: 1rem;
      padding: 0;
      padding-right: 1rem;

      &:before {
        content: '';
        position: absolute;
        width: 10.5rem;
        height: 4.5rem;
        left: -4rem;
        top: -1.5rem;
      }
    }

    svg {
      display: none;
    }
  }

  svg {
    width: 2.8rem;
    display: block;

    .svg-fill {
      fill: ${props => props.theme.offWhite};
    }
    .svg-stroke {
      stroke: ${props => props.theme.offWhite};
    }
  }

  &.no-datepicker .react-datepicker__portal {
    display: none;
  }
`

const AddWidget__Button = styled.button`
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.white};
  border: none;
  padding: 1.5rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  margin-left: auto;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkenAccent};
  }

  svg {
    width: 2.5rem;
    fill: ${props => props.theme.white};
    display: block;
    transform: rotate(-90deg);
  }

  @media ${device.mobile} {
    padding: 1.2rem;

    svg {
      width: 2.3rem;
    }
  }
`

const AddTags = styled.div`
  position: relative;

  .ReactTags__selected span.ReactTags__tag {
    position: relative;
    display: flex;
    align-items: center;
    background: ${props => props.theme.accent};
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
    background-color: ${props => props.theme.backgroundBlack};
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
    color: ${props => props.theme.grey};
  }
  .ReactTags__suggestions li mark {
    background: none;
    color: ${props => props.theme.white};
  }
  .ReactTags__suggestions ul li.ReactTags__activeSuggestion {
    background: #9e9e9e;
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
  AddButton,
  AddInputWrapper,
  AddInput,
  AddInput__Label,
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
