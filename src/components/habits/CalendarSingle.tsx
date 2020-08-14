import React, { useState } from 'react'
import { Habit } from '../../utils/ModuleTypes'
import { Styled } from '../../styles/Calendar.styles'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { getCalendarDayClass } from '../../utils/dateHelpers'
import {
  addMonths,
  addDays,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  isSameMonth,
  isSameDay
} from 'date-fns'

type CalendarProps = {
  habit: Habit
}

const CalendarSingle: React.FC<CalendarProps> = ({ habit }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const header = () => {
    const dateFormat = 'MMMM yyyy'

    return (
      <Styled.CalendarHeader>
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
    )
  }

  const daysOfWeek = () => {
    const dateFormat = 'E'
    const days = []
    let startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <Styled.CalendarDOW__Day key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Styled.CalendarDOW__Day>
      )
    }

    return <Styled.CalendarDOW>{days}</Styled.CalendarDOW>
  }

  const cells = () => {
    const monthStart = startOfMonth(currentDate)
    const rows = []
    let days = []
    let day = startOfWeek(monthStart)
    let formattedDate = ''

    while (day <= endOfWeek(endOfMonth(monthStart))) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd')
        const cloneDay = day
        let isItSameMonth = isSameMonth(cloneDay, monthStart)
        let dayClassName = getCalendarDayClass(habit.days, cloneDay)

        days.push(
          <Styled.CalendarDays__Cell
            key={cloneDay.toString()}
            className={
              !isItSameMonth
                ? `disabled ${dayClassName}`
                : isSameDay(day, new Date())
                ? `today ${dayClassName}`
                : dayClassName
            }
            onClick={() => {
              if (isItSameMonth) {
                console.log(cloneDay)
              }
            }}
          >
            <Styled.CalendarDays__Cell__Inner>
              {formattedDate}
            </Styled.CalendarDays__Cell__Inner>
          </Styled.CalendarDays__Cell>
        )

        day = addDays(day, 1)
      }

      rows.push(
        <Styled.CalendarDays key={day.toString()}> {days} </Styled.CalendarDays>
      )
      days = []
    }

    return rows
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  return (
    <Styled.CalendarContainer className="calendar">
      {header()}
      {daysOfWeek()}
      {cells()}
    </Styled.CalendarContainer>
  )
}
export default CalendarSingle
