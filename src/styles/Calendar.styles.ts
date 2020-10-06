import styled from 'styled-components'

const CalendarContainer = styled.div`
  position: relative;
  width: 95%;
  max-width: 100rem;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
`
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const CalendarHeader__Title = styled.h2`
  color: ${props => props.theme.white};
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontSemiBold};
  margin: 0 ${props => props.theme.spacingXXS};
`

const CalendarHeader__Icon = styled.span`
  transform: rotate(90deg);
  cursor: pointer;

  &.right {
    transform: rotate(-90deg);
  }
  svg {
    width: 1.6rem;
  }
`

const CalendarDOW = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin: ${props => props.theme.spacingXS} 0;
`

const CalendarDOW__Day = styled.h5`
  color: ${props => props.theme.greyishBlue};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
  padding: ${props => props.theme.spacingXXS};
`

const CalendarHabit = styled.div`
  margin-bottom: 4rem;
`

const CalendarHabit__Title = styled.h4`
  color: ${props => props.theme.white};
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontRegular};
  margin-bottom: ${props => props.theme.spacingXS};
  padding-left: 2rem;
`

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-bottom: ${props => props.theme.spacingS};
`

const CalendarDays__Cell = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:not(.disabled) {
    cursor: pointer;
  }
  &.today {
    border: 3px solid ${props => props.theme.mainBlue};
  }
  &.done {
    background-color: ${props => props.theme.habitsGreen};
  }
  &.not-done {
    background-color: ${props => props.theme.habitsRed};
  }
  &.disabled {
    opacity: 0.2;
  }
  &.strike:before,
  &.strike-sat:after {
    content: '';
    position: absolute;
    width: 4rem;
    height: 3px;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${props => props.theme.habitsGreen};
    z-index: -1;
  }
  &.strike:before {
    right: 100%;
  }
  &.strike-sat:after {
    right: unset;
    left: 100%;
  }

  @media (min-width: 550px) {
    &.strike:before {
      width: 6rem;
    }
  }
  @media (min-width: 700px) {
    &.strike:before {
      width: 8rem;
    }
  }
  @media (min-width: 850px) {
    &.strike:before {
      width: 10rem;
    }
  }
  @media (min-width: 850px) {
    &.strike:before {
      width: 12rem;
    }
  }

  &.strike-sun:before,
  &.strike-sat:after {
    width: 1rem;
  }
`

const CalendarDays__Cell__Inner = styled.span`
  color: ${props => props.theme.white};
  font-weight: ${props => props.theme.fontMedium};
  font-size: 1.8rem;
`

export const Styled = {
  CalendarContainer,
  CalendarHeader,
  CalendarHeader__Icon,
  CalendarHeader__Title,
  CalendarDOW,
  CalendarDOW__Day,
  CalendarHabit,
  CalendarHabit__Title,
  CalendarDays,
  CalendarDays__Cell,
  CalendarDays__Cell__Inner
}
