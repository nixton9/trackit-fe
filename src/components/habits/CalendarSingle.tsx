import React, { MouseEvent, ReactText } from 'react'
import { Habit, DayState } from '../../utils/ModuleTypes'
import { Styled } from '../../styles/Calendar.styles'
import { getCalendarDayInfo } from '../../utils/dateHelpers'
import {
  addDays,
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
  currentDate: Date
  handleClickDay: (
    e: MouseEvent,
    habit: ReactText,
    clonedDay: Date,
    currState: DayState | null,
    dayId: string | number | null
  ) => void
}

export const CalendarSingle: React.FC<CalendarProps> = ({
  habit,
  currentDate,
  handleClickDay
}) => {
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
        let { dayClassName, currState, dayId } = getCalendarDayInfo(
          habit.days,
          cloneDay
        )

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
            onClick={e => {
              if (isItSameMonth) {
                handleClickDay(e, habit.id, cloneDay, currState, dayId)
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
        <Styled.CalendarDays key={day.toString()} className="calendar-single">
          {' '}
          {days}{' '}
        </Styled.CalendarDays>
      )
      days = []
    }

    return rows
  }

  return (
    <>
      {daysOfWeek()}
      {cells()}
    </>
  )
}
