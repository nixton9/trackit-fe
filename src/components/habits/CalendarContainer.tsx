import React, { useState, useEffect } from 'react'
import { CalendarAll } from './CalendarAll'
import { CalendarSingle } from './CalendarSingle'
import { Habit, DayState } from '../../utils/ModuleTypes'
import { getDayNextClass } from '../../utils/dateHelpers'
import { Styled } from '../../styles/Calendar.styles'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { format, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns'

const dateFormat = 'MMMM yyyy'

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

  useEffect(() => {
    setCurrentDate(new Date())
  }, [showAll])

  return (
    <Styled.CalendarContainer className="calendar">
      <Styled.CalendarHeader className="calendar-header">
        <Styled.CalendarHeader__Icon onClick={prevMonth}>
          <ChevronIcon />
        </Styled.CalendarHeader__Icon>
        <Styled.CalendarHeader__Title>
          {format(currentDate, dateFormat)}
        </Styled.CalendarHeader__Title>
        <Styled.CalendarHeader__Icon className="right" onClick={nextMonth}>
          <ChevronIcon />
        </Styled.CalendarHeader__Icon>
      </Styled.CalendarHeader>

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
    </Styled.CalendarContainer>
  )
}

export default CalendarContainer
