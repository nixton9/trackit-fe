import styled from 'styled-components'
import { device } from './theme'

const chevronUrl = process.env.PUBLIC_URL + '/chevron.svg'

const DatePickerContainer = styled.div`
  display: inline-block;

  .react-datepicker {
    background-color: ${props => props.theme.surfacesBlack};
    border: none;
    border-radius: ${props => props.theme.smallBorderRadius};
    font-family: ${props => props.theme.fontFamily};
    box-shadow: 14px 14px 16px 0 rgba(0, 0, 0, 0.07);
  }

  .react-datepicker-wrapper {
    input {
      color: ${props => props.theme.offWhite};
      font-weight: ${props => props.theme.fontMedium};
      background: none;
      border: none;
    }
  }

  .react-datepicker__tab-loop {
    position: absolute;
    top: 0;
    left: 0;
  }
  .react-datepicker__header {
    background-color: ${props => props.theme.surfacesBlack};
    border-top-right-radius: ${props => props.theme.smallBorderRadius};
    border-top-left-radius: ${props => props.theme.smallBorderRadius};
    padding-top: ${props => props.theme.spacingXS};
    border-bottom: none;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 4rem !important;
    line-height: 4rem !important;
    font-size: 1.6rem;
    border-radius: 50%;
    color: ${props => props.theme.offWhite};
    margin: 0 0.5rem;
  }
  .react-datepicker__navigation {
    width: 15px;
    height: 15px;
    border: none;
    top: 1.7rem;
  }
  .react-datepicker__current-month {
    color: ${props => props.theme.white};
    font-size: 1.6rem;
    font-weight: ${props => props.theme.fontSemiBold};
  }
  .react-datepicker__day-names {
    margin-top: ${props => props.theme.spacingXXS};
  }
  .react-datepicker__day-name {
    color: ${props => props.theme.grey};
    font-weight: ${props => props.theme.fontRegular};
    font-size: 1.4rem;
  }
  .react-datepicker__day:hover,
  .react-datepicker__day:active {
    background-color: #31343e;
  }
  .react-datepicker__day--selected {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.alwaysWhite};
  }
  .react-datepicker__month {
    padding: 0 0.5rem 0.5rem 0.5rem;
    margin: 0 0.4rem 1rem 0.4rem;
  }
  .react-datepicker__day--disabled {
    opacity: 0.2;
  }
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    border-bottom-color: ${props => props.theme.surfacesBlack};
    &:before {
      border-bottom-color: #333333;
    }
  }
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  @media ${device.mobileXS} {
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      width: 3rem !important;
      line-height: 3rem !important;
    }
  }
`

export const Styled = {
  DatePickerContainer
}
