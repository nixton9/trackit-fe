import React, { useState, useEffect } from 'react'
import { CalendarAll } from './CalendarAll'
import { CalendarSingle } from './CalendarSingle'
import { Habit, DayState } from '../../utils/ModuleTypes'
import { getDayNextClass } from '../../utils/dateHelpers'
import { Styled } from '../../styles/Calendar.styles'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { TouchScrollable } from 'react-scrolllock'
import {
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addDays,
  startOfWeek
} from 'date-fns'

const dateFormat = 'MMMM yyyy'
const weekDateFormat = 'E'

type CalendarContainerProps = {
  showAll: boolean
  sortedHabits: Habit[]
  currHabit: any
  handleDayClick: (
    habitId: string | number,
    day: Date,
    currState: DayState | null,
    dayId: null | string | number
  ) => void
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({
  showAll,
  sortedHabits,
  currHabit,
  handleDayClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const nextMonth = () => {
    setCurrentDate(
      showAll ? addWeeks(currentDate, 1) : addMonths(currentDate, 1)
    )
  }

  const prevMonth = () => {
    setCurrentDate(
      showAll ? subWeeks(currentDate, 1) : subMonths(currentDate, 1)
    )
  }

  const handleClickDay = (
    e: any,
    habit: any,
    clonedDay: any,
    currState: any,
    dayId: any
  ) => {
    const dayClass = getDayNextClass(currState)
    e.target.classList.add(dayClass)
    if (dayClass === 'blank') {
      e.target.classList.remove('done', 'not-done')
    }
    handleDayClick(habit, clonedDay, currState, dayId)
  }

  const daysOfWeek = () => {
    const days = []
    let startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <Styled.CalendarDOW__Day key={i}>
          {format(addDays(startDate, i), weekDateFormat)}
        </Styled.CalendarDOW__Day>
      )
    }

    return (
      <Styled.CalendarDOW className="calendar-days-wrapper">
        {days}
      </Styled.CalendarDOW>
    )
  }

  useEffect(() => {
    setCurrentDate(new Date())
  }, [showAll])

  return (
    <Styled.CalendarContainer className="calendar">
      <div className="calendar-header">
        <Styled.CalendarHeader>
          <Styled.CalendarHeader__Icon
            onClick={prevMonth}
            className="mbl-click mbl-click-small"
          >
            <ChevronIcon />
          </Styled.CalendarHeader__Icon>
          <Styled.CalendarHeader__Title>
            {format(currentDate, dateFormat)}
          </Styled.CalendarHeader__Title>
          <Styled.CalendarHeader__Icon
            className="right mbl-click mbl-click-small"
            onClick={nextMonth}
          >
            <ChevronIcon />
          </Styled.CalendarHeader__Icon>
        </Styled.CalendarHeader>

        {daysOfWeek()}
      </div>

      <TouchScrollable>
        <Styled.CalendarContent>
          {showAll ? (
            <CalendarAll
              habits={sortedHabits}
              currentDate={currentDate}
              handleClickDay={handleClickDay}
            />
          ) : (
            currHabit && (
              <CalendarSingle
                currentDate={currentDate}
                habit={currHabit}
                handleClickDay={handleClickDay}
              />
            )
          )}
        </Styled.CalendarContent>
      </TouchScrollable>
    </Styled.CalendarContainer>
  )
}

export default CalendarContainer
