import styled from 'styled-components/macro'
import { device } from './theme'

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
  padding: 0.5rem;
  cursor: pointer;

  &.right {
    transform: rotate(-90deg);
  }
  svg {
    width: 1.6rem;
    stroke: ${props => props.theme.white};
    transition: all 0.25s ease;
  }
`

const CalendarDOW = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin: ${props => props.theme.spacingXS} 0 0 0;
`

const CalendarDOW__Day = styled.h5`
  color: ${props => props.theme.grey};
  font-weight: ${props => props.theme.fontLight};
  font-size: 1.4rem;
  padding: ${props => props.theme.spacingXXS};
`

const CalendarContent = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingXXS}
    ${props => props.theme.spacingS} 0;
`

const CalendarHabit = styled.div`
  margin-bottom: ${props => props.theme.spacingM};
`

const CalendarHabit__Title = styled.h4`
  display: inline-block;
  background: ${props => props.theme.accent};
  color: ${props => props.theme.alwaysWhite};
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-size: 1.7rem;
  font-weight: ${props => props.theme.fontRegular};
  margin-bottom: ${props => props.theme.spacingS};
  margin-left: ${props => props.theme.spacingS};
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkenAccent};
  }
`

const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-bottom: ${props => props.theme.spacingS};

  &.calendar-single {
    margin-bottom: ${props => props.theme.spacingL};

    @media ${device.tablet} {
      margin-bottom: ${props => props.theme.spacingM};
    }

    @media ${device.tabletXS} {
      margin-bottom: ${props => props.theme.spacingS};
    }
  }
`

const CalendarDays__Cell = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${props => props.theme.white};

  &:not(.disabled) {
    cursor: pointer;
  }
  &:active {
    background-color: ${props => props.theme.activeBackground};
  }
  &.today {
    border: 3px solid ${props => props.theme.accent};
  }
  &.done {
    background-color: ${props => props.theme.habitsGreen};
    color: ${props => props.theme.alwaysWhite};
  }
  &.not-done {
    background-color: ${props => props.theme.habitsRed};
    color: ${props => props.theme.alwaysWhite};
  }
  &.disabled {
    opacity: 0.2;
  }
  &.disabled.done {
    opacity: 1;
    background: #203e30;
  }
  &.disabled.done span {
    color: #4c4d53;
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
  &.disabled.strike:before {
    background: #203e30;
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
  color: inherit;
  font-weight: ${props => props.theme.fontMedium};
  font-size: 1.8rem;
  pointer-events: none;
`

export const Styled = {
  CalendarContainer,
  CalendarHeader,
  CalendarHeader__Icon,
  CalendarHeader__Title,
  CalendarDOW,
  CalendarDOW__Day,
  CalendarContent,
  CalendarHabit,
  CalendarHabit__Title,
  CalendarDays,
  CalendarDays__Cell,
  CalendarDays__Cell__Inner
}
